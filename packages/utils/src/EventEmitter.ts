import type { AnyObject } from './is';

export interface EventSubscription {
  remove(): void;
}

interface Registration<T extends any[]> {
  context: unknown;
  listener: (...args: T) => unknown;
  remove: () => void;
}

type Registry<T extends AnyObject<any[]>> = {
  [K in keyof T]?: Set<Registration<T[K]>>;
};

export class EventEmitter<T extends AnyObject<any[]>> {
  #registry: Registry<T> = {};

  #allocate<U extends keyof T>(eventType: U): Set<Registration<T[U]>> {
    this.#registry[eventType] ??= new Set<Registration<T[U]>>();
    return this.#registry[eventType];
  }

  addListener<U extends keyof T>(
    eventType: U,
    listener: (...args: T[U]) => unknown,
    context: unknown = undefined,
  ): EventSubscription {
    const registrations = this.#allocate(eventType);
    const registration: Registration<T[U]> = {
      context,
      listener,
      remove: () => {
        registrations.delete(registration);
      },
    };
    registrations.add(registration);
    return registration;
  }

  emit<U extends keyof T>(eventType: U, ...args: T[U]) {
    const registrations = this.#registry[eventType];
    if (registrations != null) {
      for (const registration of [...registrations]) {
        registration.listener.apply(registration.context, args);
      }
    }
  }

  removeAllListeners<U extends keyof T>(eventType?: U) {
    if (eventType == null) {
      this.#registry = {};
    } else {
      delete this.#registry[eventType];
    }
  }

  listenerCount<U extends keyof T>(eventType: U) {
    return this.#registry[eventType]?.size ?? 0;
  }
}
