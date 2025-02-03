import { useState, useEffect } from "react";
import { useCloudStatus } from "../context/CloudStatusProvider";

const TopLoadingBar = () => {
  const { cloudStatus } = useCloudStatus();
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [opacityDelay, setOpacityDelay] = useState(false);

  useEffect(() => {
    if (cloudStatus === "pending") {
      setProgress(0);
      setCompleted(false);
      setOpacityDelay(false);
      startProgress();
    } else {
      setProgress(100);
    }
  }, [cloudStatus]);

  const startProgress = () => {
    setProgress(1); // Ensure the effect triggers

    const getRandomIncrement = () => {
      const weights = [2, 3, 9, 12, 15];
      const probabilities = [0.15, 0.2, 0.2, 0.15, 0.1];
      const rand = Math.random();
      let sum = 0;

      for (let i = 0; i < weights.length; i++) {
        sum += probabilities[i];
        if (rand < sum) return weights[i];
      }
      return 1;
    };

    const stopAtRandom = Math.floor(Math.random() * (80 - 60 + 1)) + 60;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= stopAtRandom) {
          clearInterval(interval);
          //   setCompleted(true);
          return prev;
        }
        return Math.min(prev + getRandomIncrement(), 100);
      });
    }, 100);
  };

  useEffect(() => {
    if (completed) {
      const opacityTimeout = setTimeout(() => setOpacityDelay(true), 200);
      const resetTimeout = setTimeout(() => setCompleted(false), 2500);

      return () => {
        clearTimeout(opacityTimeout);
        clearTimeout(resetTimeout);
      };
    }
  }, [completed]);

  return (
    <div>
      <div
        className="fixed top-0 left-0  h-[3px] bg-white "
        style={{
          width: `${progress}%`,
          opacity: opacityDelay || progress === 100 || completed ? 0 : 1,
          transition: "width 0.1s ease-out, opacity 0.5s ease-out",
        }}
      />
      {/* <div className="p-10 flex gap-2">
        <button
          onClick={() => {
            setProgress(0);
            setCompleted(false);
            setOpacityDelay(false);
            startProgress(); // Restart progress
          }}
          className="border border-white p-2 rounded-md"
        >
          Initiate
        </button>
        <button
          onClick={() => setProgress(100)}
          className="border border-white p-2 rounded-md"
        >
          Fullfill
        </button>
      </div> */}
    </div>
  );
};

export default TopLoadingBar;
