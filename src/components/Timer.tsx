import { useState, useEffect } from "react";

import { FaClock } from "react-icons/fa6";

export const Timer = ({ value }: { value: number }) => {
  const [time, setTime] = useState(value);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [time]);

  const formatTime = (seconds: number) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="flex gap-2 items-center rounded-full bg-white/10 text-white px-2 py-1">
      <FaClock className="w-4" />
      {formatTime(time)}
    </div>
  );
};
