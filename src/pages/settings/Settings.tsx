import { useEffect, useState } from "react";
import UserPanel from "../../components/UserPanel/UserPanel";
import { statsMap as defaultStats } from "../config";
import { Stats } from "../types";

const loadStats = (): Stats => {
  const data = localStorage.getItem("stats");

  let stats: Stats = defaultStats;
  if (data) {
    stats = JSON.parse(data);
  }

  return stats;
};

const Settings = () => {
  const [stats, setStats] = useState<Stats>(loadStats());

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const saveStats = (stats: Stats) => {
    const statsString = JSON.stringify(stats);
    localStorage.setItem("stats", statsString);
    setStats(stats);
  };

  return (
    <div>
      <UserPanel
        user={{ name: "", stats, id: "default_id" }}
        onStatsChange={(_, stats) => saveStats(stats)}
        onRemoveUser={() => saveStats(defaultStats)}
      />
    </div>
  );
};

export default Settings;
