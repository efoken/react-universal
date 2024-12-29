import type { AnyObject } from '@react-universal/utils';
import { isFunction, normalizeEvent } from '@react-universal/utils';
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import type { ImageSize } from './Image.types';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class ImageUriCache {
  static #maximumEntries = 256;

  static #entries: AnyObject<{ lastUsedTimestamp: number; refCount: number }> = {};

  static has(uri: string) {
    return uri.startsWith('data:') || !!ImageUriCache.#entries[uri];
  }

  static add(uri: string) {
    const lastUsedTimestamp = Date.now();
    if (ImageUriCache.#entries[uri]) {
      ImageUriCache.#entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      ImageUriCache.#entries[uri].refCount += 1;
    } else {
      ImageUriCache.#entries[uri] = {
        lastUsedTimestamp,
        refCount: 1,
      };
    }
  }

  static remove(uri: string) {
    if (ImageUriCache.#entries[uri]) {
      ImageUriCache.#entries[uri].refCount -= 1;
    }
    // Free up entries when the cache is "full"
    ImageUriCache.#cleanUpIfNeeded();
  }

  static #cleanUpIfNeeded() {
    const uris = Object.keys(ImageUriCache.#entries);

    if (uris.length + 1 > ImageUriCache.#maximumEntries) {
      let leastRecentlyUsedKey: string | undefined;
      let leastRecentlyUsedEntry: { lastUsedTimestamp: number; refCount: number } | undefined;

      for (const uri of uris) {
        const entry = ImageUriCache.#entries[uri];
        if (
          (!leastRecentlyUsedEntry ||
            entry.lastUsedTimestamp < leastRecentlyUsedEntry.lastUsedTimestamp) &&
          entry.refCount === 0
        ) {
          leastRecentlyUsedKey = uri;
          leastRecentlyUsedEntry = entry;
        }
      }

      if (leastRecentlyUsedKey) {
        delete ImageUriCache.#entries[leastRecentlyUsedKey];
      }
    }
  }
}

let id = 0;
const requests: Record<
  number,
  {
    image: HTMLImageElement;
    onError: any;
    onLoad: any;
  }
> = {};

export const ImageLoader = {
  abort(requestId: number) {
    const request = requests[requestId];
    if (request) {
      request.image.removeEventListener('error', request.onError);
      request.image.removeEventListener('load', request.onLoad);
      delete requests[requestId];
    }
  },

  getSize(uri: string) {
    return new Promise<ImageSize>((resolve, reject) => {
      let complete = false;

      const handleLoad = () => {
        const request = requests[requestId];
        if (request) {
          const { naturalHeight, naturalWidth } = request.image;
          if (naturalHeight && naturalWidth) {
            resolve({ height: naturalHeight, width: naturalWidth });
            complete = true;
          }
        }
        if (complete) {
          ImageLoader.abort(requestId);
          clearInterval(interval);
        }
      };

      const handleError = () => {
        reject(new Error('Unable to load image'));
        ImageLoader.abort(requestId);
        clearInterval(interval);
      };

      const interval = setInterval(handleLoad, 16);
      const requestId = ImageLoader.load(uri, handleLoad, handleError);
    });
  },

  has(uri: string) {
    return ImageUriCache.has(uri);
  },

  load(
    uri: string,
    onLoad: (event: NativeSyntheticEvent<ImageLoadEventData>) => void,
    onError: () => void,
  ) {
    id += 1;
    const image = new Image();

    const handleLoad = (e: Event) => {
      // Avoid blocking the main thread
      const onDecode = () =>
        onLoad(
          normalizeEvent(e as any, {
            source: { height: image.naturalHeight, uri, width: image.naturalWidth },
          }),
        );
      if (isFunction(image.decode)) {
        // Safari currently throws exceptions when decoding SVGs. We want to
        // catch that error and allow the load handler to be forwarded to the
        // onLoad handler in this case
        image.decode().then(onDecode, onDecode);
      } else {
        setTimeout(onDecode, 0);
      }
    };

    image.addEventListener('error', onError);
    image.addEventListener('load', handleLoad);
    image.src = uri;
    requests[id] = { image, onError, onLoad: handleLoad };
    return id;
  },

  prefetch(uri: string) {
    return new Promise<boolean>((resolve, reject) => {
      ImageLoader.load(
        uri,
        () => {
          // Add the uri to the cache so it can be immediately displayed when
          // used but also immediately remove it to correctly reflect that it
          // has no active references
          ImageUriCache.add(uri);
          ImageUriCache.remove(uri);
          resolve(true);
        },
        reject,
      );
    });
  },

  queryCache(uris: string[]) {
    const result: AnyObject<'disk/memory'> = {};
    for (const uri of uris) {
      if (ImageUriCache.has(uri)) {
        result[uri] = 'disk/memory';
      }
    }
    return Promise.resolve(result);
  },
};
