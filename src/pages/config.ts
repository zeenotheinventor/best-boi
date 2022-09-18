import { Stats } from "./types";

export const statsMap: Stats = {
  interviews: 250,
  deals: 1000,
  cvs: 100,
  client_calls: 5,
};

export const calculateScore = (stats: Stats) => {
  let score = 0;

  Object.keys(statsMap).forEach(
    (att) => (score += stats[att as keyof Stats] * statsMap[att as keyof Stats]),
  );
  return score;
};
