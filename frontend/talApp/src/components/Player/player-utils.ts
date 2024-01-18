export const equalizerKeyFrames = {
  "0%": {
    height: "60%",
  },
  "4%": {
    height: "50%",
  },
  "8%": {
    height: "40%",
  },
  "12%": {
    height: "30%",
  },
  "16%": {
    height: "20%",
  },
  "20%": {
    height: "30%",
  },
  "24%": {
    height: "40%",
  },
  "28%": {
    height: "10%",
  },
  "32%": {
    height: "40%",
  },
  "36%": {
    height: "60%",
  },
  "40%": {
    height: "20%",
  },
  "44%": {
    height: "40%",
  },
  "48%": {
    height: "70%",
  },
  "52%": {
    height: "30%",
  },
  "56%": {
    height: "10%",
  },
  "60%": {
    height: "30%",
  },
  "64%": {
    height: "50%",
  },
  "68%": {
    height: "60%",
  },
  "72%": {
    height: "70%",
  },
  "76%": {
    height: "80%",
  },
  "80%": {
    height: "70%",
  },
  "84%": {
    height: "60%",
  },
  "88%": {
    height: "50%",
  },
  "92%": {
    height: "60%",
  },
  "96%": {
    height: "70%",
  },
  "100%": {
    height: "80%",
  },
};

export const formatDuration = (value: number) => {
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};
