import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useCloudStatus } from "../context/CloudStatusProvider";

const TopLoadingBar = () => {
  const { cloudStatus } = useCloudStatus();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (cloudStatus === "pending") {
      setDisplay(true);
      startProgress();
    } else {
      setProgress(100);
      setTimeout(() => setProgress(100), 250);
      setTimeout(() => setDisplay(false), 500);
      setTimeout(() => setProgress(0), 1000);
    }
  }, [cloudStatus]);

  useEffect(() => {
    setDisplay(true);
    startProgress();
    setTimeout(() => setProgress(100), 250);
    setTimeout(() => setDisplay(false), 500);
    setTimeout(() => setProgress(0), 800);
  }, [location.pathname]);

  const startProgress = () => {
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
          return prev;
        }
        return Math.min(prev + getRandomIncrement(), 100);
      });
    }, 100);
  };

  return (
    <div>
      <div
        className="fixed top-0 left-0 h-[3px] bg-white"
        style={{
          width: `${progress}%`,
          opacity: display ? 1 : 0,
          transition: "width 0.25s ease-out, opacity 0.5s ease-out",
        }}
      />
    </div>
  );
};

export default TopLoadingBar;
