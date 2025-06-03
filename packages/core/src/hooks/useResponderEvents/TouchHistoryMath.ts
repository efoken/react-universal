import type { TouchHistory } from './ResponderTouchHistoryStore';

export class TouchHistoryMath {
  static #noCentroid = -1;

  static centroidDimension(
    touchHistory: TouchHistory,
    touchesChangedAfter: number,
    xAxis: boolean,
    current: boolean,
  ) {
    let total = 0;
    let count = 0;

    const touchTrack =
      touchHistory.numberActiveTouches === 1
        ? touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch]
        : undefined;

    if (touchTrack != null) {
      if (touchTrack.touchActive && touchTrack.currentTimeStamp > touchesChangedAfter) {
        total +=
          current && xAxis
            ? touchTrack.currentPageX
            : current && !xAxis
              ? touchTrack.currentPageY
              : !current && xAxis
                ? touchTrack.previousPageX
                : touchTrack.previousPageY;
        count = 1;
      }
    } else {
      for (const touchTrack of touchHistory.touchBank) {
        if (touchTrack.touchActive && touchTrack.currentTimeStamp >= touchesChangedAfter) {
          let toAdd: number;
          if (current && xAxis) {
            toAdd = touchTrack.currentPageX;
          } else if (current && !xAxis) {
            toAdd = touchTrack.currentPageY;
          } else if (!current && xAxis) {
            toAdd = touchTrack.previousPageX;
          } else {
            toAdd = touchTrack.previousPageY;
          }
          total += toAdd;
          count++;
        }
      }
    }

    return count > 0 ? total / count : TouchHistoryMath.#noCentroid;
  }

  static currentCentroidXOfTouchesChangedAfter(
    touchHistory: TouchHistory,
    touchesChangedAfter: number,
  ) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, true);
  }

  static currentCentroidYOfTouchesChangedAfter(
    touchHistory: TouchHistory,
    touchesChangedAfter: number,
  ) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, true);
  }

  static previousCentroidXOfTouchesChangedAfter(
    touchHistory: TouchHistory,
    touchesChangedAfter: number,
  ) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, false);
  }

  static previousCentroidYOfTouchesChangedAfter(
    touchHistory: TouchHistory,
    touchesChangedAfter: number,
  ) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, false);
  }

  static currentCentroidX(touchHistory: TouchHistory) {
    return TouchHistoryMath.centroidDimension(touchHistory, 0, true, true);
  }

  static currentCentroidY(touchHistory: TouchHistory) {
    return TouchHistoryMath.centroidDimension(touchHistory, 0, false, true);
  }
}
