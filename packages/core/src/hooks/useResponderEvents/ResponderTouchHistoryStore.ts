import type { NativeTouchEvent } from 'react-native';
import { isEndish, isMoveish, isStartish } from './utils';

type TouchRecord = {
  currentPageX: number;
  currentPageY: number;
  currentTimeStamp: number;
  previousPageX: number;
  previousPageY: number;
  previousTimeStamp: number;
  startPageX: number;
  startPageY: number;
  startTimeStamp: number;
  touchActive: boolean;
};

export type TouchHistory = {
  indexOfSingleActiveTouch: number;
  mostRecentTimeStamp: number;
  numberActiveTouches: number;
  touchBank: TouchRecord[];
};

const MAX_TOUCH_BANK = 20;

/**
 * TODO: Instead of making gestures recompute filtered velocity, we could
 * include a built in velocity computation that can be reused globally.
 */
function createTouchRecord(touch: NativeTouchEvent): TouchRecord {
  return {
    touchActive: true,
    startPageX: touch.pageX,
    startPageY: touch.pageY,
    startTimeStamp: touch.timestamp,
    currentPageX: touch.pageX,
    currentPageY: touch.pageY,
    currentTimeStamp: touch.timestamp,
    previousPageX: touch.pageX,
    previousPageY: touch.pageY,
    previousTimeStamp: touch.timestamp,
  };
}

function resetTouchRecord(touchRecord: TouchRecord, touch: NativeTouchEvent) {
  touchRecord.touchActive = true;
  touchRecord.startPageX = touch.pageX;
  touchRecord.startPageY = touch.pageY;
  touchRecord.startTimeStamp = touch.timestamp;
  touchRecord.currentPageX = touch.pageX;
  touchRecord.currentPageY = touch.pageY;
  touchRecord.currentTimeStamp = touch.timestamp;
  touchRecord.previousPageX = touch.pageX;
  touchRecord.previousPageY = touch.pageY;
  touchRecord.previousTimeStamp = touch.timestamp;
}

function getTouchIdentifier({ identifier }: any): number {
  if (identifier == null) {
    console.error('React Universal: Touch object is missing identifier.');
  }
  if (process.env.NODE_ENV !== 'production') {
    if (identifier > MAX_TOUCH_BANK) {
      console.error(
        `React Universal: Touch identifier ${identifier} is greater than maximum supported ${MAX_TOUCH_BANK} which causes performance issues backfilling array locations for all of the indices.`,
      );
    }
  }
  return identifier;
}

function recordTouchStart(touch: NativeTouchEvent, touchHistory: TouchHistory) {
  const identifier = getTouchIdentifier(touch);
  const touchRecord = touchHistory.touchBank[identifier];
  if (touchRecord) {
    resetTouchRecord(touchRecord, touch);
  } else {
    touchHistory.touchBank[identifier] = createTouchRecord(touch);
  }
  touchHistory.mostRecentTimeStamp = touch.timestamp;
}

function recordTouchMove(touch: NativeTouchEvent, touchHistory: TouchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  if (touchRecord) {
    touchRecord.touchActive = true;
    touchRecord.previousPageX = touchRecord.currentPageX;
    touchRecord.previousPageY = touchRecord.currentPageY;
    touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
    touchRecord.currentPageX = touch.pageX;
    touchRecord.currentPageY = touch.pageY;
    touchRecord.currentTimeStamp = touch.timestamp;
    touchHistory.mostRecentTimeStamp = touch.timestamp;
  } else {
    console.warn(
      [
        'React Universal: Cannot record touch move without a touch start.',
        `Touch Move: ${printTouch(touch)}`,
        `Touch Bank: ${printTouchBank(touchHistory)}`,
      ].join('\n'),
    );
  }
}

function recordTouchEnd(touch: NativeTouchEvent, touchHistory: TouchHistory) {
  const touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  if (touchRecord) {
    touchRecord.touchActive = false;
    touchRecord.previousPageX = touchRecord.currentPageX;
    touchRecord.previousPageY = touchRecord.currentPageY;
    touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
    touchRecord.currentPageX = touch.pageX;
    touchRecord.currentPageY = touch.pageY;
    touchRecord.currentTimeStamp = touch.timestamp;
    touchHistory.mostRecentTimeStamp = touch.timestamp;
  } else {
    console.warn(
      [
        'React Universal: Cannot record touch end without a touch start.',
        `Touch End: ${printTouch(touch)}`,
        `Touch Bank: ${printTouchBank(touchHistory)}`,
      ].join('\n'),
    );
  }
}

function printTouch(touch: NativeTouchEvent): string {
  return JSON.stringify({
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    timestamp: touch.timestamp,
  });
}

function printTouchBank(touchHistory: TouchHistory): string {
  let printed = JSON.stringify(touchHistory.touchBank.slice(0, MAX_TOUCH_BANK));
  if (touchHistory.touchBank.length > MAX_TOUCH_BANK) {
    printed += ` (original size: ${touchHistory.touchBank.length})`;
  }
  return printed;
}

/**
 * Tracks the position and time of each active touch by `touch.identifier`. We
 * should typically only see IDs in the range of 1-20 because IDs get recycled
 * when touches end and start again.
 */
export class ResponderTouchHistoryStore {
  #touchHistory: TouchHistory = {
    // If there is only one active touch, we remember its location. This
    // prevents us having to loop through all of the touches all the time in the
    // most common case.
    indexOfSingleActiveTouch: -1,
    mostRecentTimeStamp: 0,
    numberActiveTouches: 0,
    touchBank: [],
  };

  recordTouchTrack(domEvent: Event, nativeEvent: NativeTouchEvent) {
    if (isMoveish(domEvent)) {
      for (const touch of nativeEvent.changedTouches) {
        recordTouchMove(touch, this.#touchHistory);
      }
    } else if (isStartish(domEvent)) {
      for (const touch of nativeEvent.changedTouches) {
        recordTouchStart(touch, this.#touchHistory);
      }
      this.#touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (this.#touchHistory.numberActiveTouches === 1) {
        // @ts-expect-error
        this.#touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier;
      }
    } else if (isEndish(domEvent)) {
      for (const touch of nativeEvent.changedTouches) {
        recordTouchEnd(touch, this.#touchHistory);
      }
      this.#touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (this.#touchHistory.numberActiveTouches === 1) {
        for (const [i, touchRecord] of this.#touchHistory.touchBank.entries()) {
          if (touchRecord?.touchActive) {
            this.#touchHistory.indexOfSingleActiveTouch = i;
            break;
          }
        }
        if (process.env.NODE_ENV !== 'production') {
          const touchRecord =
            this.#touchHistory.touchBank[this.#touchHistory.indexOfSingleActiveTouch];
          if (!touchRecord?.touchActive) {
            console.error('React Universal: Cannot find single active touch.');
          }
        }
      }
    }
  }

  get touchHistory() {
    return this.#touchHistory;
  }
}
