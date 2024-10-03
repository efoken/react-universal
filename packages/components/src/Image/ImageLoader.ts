import { normalizeEvent } from '@react-universal/utils';
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import type { ImageSize } from './Image.types';

export class ImageUriCache {
  static #maximumEntries = 256;

  static #entries: Record<string, { lastUsedTimestamp: number; refCount: number }> = {};

  static has(uri: string) {
    return uri.startsWith('data:') || !!this.#entries[uri];
  }

  static add(uri: string) {
    const lastUsedTimestamp = Date.now();
    if (this.#entries[uri]) {
      this.#entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      this.#entries[uri].refCount += 1;
    } else {
      this.#entries[uri] = {
        lastUsedTimestamp,
        refCount: 1,
      };
    }
  }

  static remove(uri: string) {
    if (this.#entries[uri]) {
      this.#entries[uri].refCount -= 1;
    }
    // Free up entries when the cache is "full"
    this.#cleanUpIfNeeded();
  }

  static #cleanUpIfNeeded() {
    const uris = Object.keys(this.#entries);

    if (uris.length + 1 > this.#maximumEntries) {
      let leastRecentlyUsedKey: string | undefined;
      let leastRecentlyUsedEntry: { lastUsedTimestamp: number; refCount: number } | undefined;

      for (const uri of uris) {
        const entry = this.#entries[uri];
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
        delete this.#entries[leastRecentlyUsedKey];
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
      let interval: ReturnType<typeof setInterval>;
      let requestId: number;

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

      interval = setInterval(handleLoad, 16);
      requestId = ImageLoader.load(uri, handleLoad, handleError);
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
      if (typeof image.decode === 'function') {
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
    const result: Record<string, 'disk/memory'> = {};
    for (const uri of uris) {
      if (ImageUriCache.has(uri)) {
        result[uri] = 'disk/memory';
      }
    }
    return Promise.resolve(result);
  },
};
