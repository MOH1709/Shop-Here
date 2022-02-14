import { useEffect } from "react";

export default function OnSwipe({ onSwipeLeft, onSwipeRight }) {
  useEffect(() => {
    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
      if (touchendX - touchstartX < -70 && onSwipeLeft) {
        onSwipeLeft();
      } else if (touchendX - touchstartX > 70 && onSwipeRight) {
        onSwipeRight();
      }
    }

    const onStart = (e) => {
      touchstartX = e.changedTouches[0].screenX;
    };

    const onEnd = (e) => {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    };

    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return <></>;
}
