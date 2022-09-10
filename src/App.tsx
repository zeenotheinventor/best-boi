import React, { useEffect, useState } from "react";
import "./App.css";

import AddUserForm from "./AddUserForm";
import { Stats, User } from "./types";
import UserPanel from "./UserPanel";
import { Button, Grid, Typography } from "@mui/material";
import { calculateScore } from "./config";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const addUser = (user: User) => {
    saveUsers([...users, user]);
  };

  const removeUser = (id: string) => {
    saveUsers(users.filter((user) => user.id !== id));
  };

  const updateStats = (id: string, stats: Stats) => {
    const newUsers = users.map((user) => user);
    const userIndex = newUsers.findIndex((user) => user.id === id);
    newUsers[userIndex].stats = stats;

    console.log(newUsers);

    saveUsers([...newUsers]);
  };

  const saveUsers = (users: User[]) => {
    const usersString = JSON.stringify(users);
    localStorage.setItem("users", usersString);
    setUsers(users);
  };

  const loadUsers = (): User[] => {
    const data = localStorage.getItem("users");

    let users: User[] = [];
    if (data) {
      users = JSON.parse(data);
    }

    return users;
  };

  const handleComputeRecommendation = () => {
    if (!(users.length > 0)) {
      alert("YOU NEED TO ADD USERS!");
      return;
    }

    const userScores = users.map((user) => {
      const { stats } = user;
      const score = calculateScore(stats);

      return { score, user };
    });

    userScores.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    });

    const maxUser = userScores[0].user.name;
    console.log(userScores);

    alert(`Your best Bet is ${maxUser}`);
  };

  return (
    <div className="App">
      <Typography variant="h3">Smart Sales Companion</Typography>
      <AddUserForm onSubmit={addUser} />
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={3} key={user.id}>
            <UserPanel
              key={user.id}
              user={user}
              onRemoveUser={removeUser}
              onStatsChange={updateStats}
            />
          </Grid>
        ))}
      </Grid>
      {users.length > 0 && (
        <Button sx={{ mt: 3 }} onClick={handleComputeRecommendation}>
          Compute Recommendation
        </Button>
      )}
      {process.env.NODE_ENV === "development" && (
        <Button sx={{ mt: 3 }} onClick={() => console.log(users)}>
          See Users
        </Button>
      )}
    </div>
  );
}

export default App;
