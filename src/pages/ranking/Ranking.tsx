import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { calculateScore } from "../config";
import { loadUsers } from "../Home";
import { orderBy, round } from "lodash";
import { User } from "../types";

const Ranking = () => {
  const [leads, setLeads] = useState(0);
  const [users] = useState(orderBy(loadUsers(), [(user) => calculateScore(user.stats)], "desc"));
  const totalPoints = users.reduce((sum, { stats }) => sum + calculateScore(stats), 0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLeads(Number(e.target.value));
  };

  const renderUserRank = ({ name, stats }: User, rank: number) => {
    return (
      <Box key={rank}>
        <Box>
          Rank {rank + 1}: {name}, {round((calculateScore(stats) / totalPoints) * leads)} leads
          {process.env.NODE_ENV === "development" && <span>&nbsp;{calculateScore(stats)}pts</span>}
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Typography variant="h3">Your best bet is {users[0].name}</Typography>
      <Box sx={{ my: 3 }}>
        <TextField value={leads} onChange={handleChange} type="number" />
      </Box>
      <Box>{users.map(renderUserRank)}</Box>
    </Box>
  );
};

export default Ranking;
