import { loadStats } from "./settings/Settings";
import { Stats } from "./types";

export const statsMap: Stats = {
  interviews: 250,
  deals: 1000,
  cvs: 100,
  client_calls: 5,
};

export const calculateScore = (stats: Stats): number => {
  let score = 0;

  const statsSettings = loadStats();

  Object.keys(statsSettings).forEach(
    (att) => (score += stats[att as keyof Stats] * statsSettings[att as keyof Stats]),
  );
  return score;
};
