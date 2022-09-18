import React, { useEffect, useState } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import AddUserForm from "../components/AddUserForm/AddUserForm";
import { User, Stats } from "./types";
import UserPanel from "../components/UserPanel/UserPanel";
import { useNavigate } from "react-router-dom";

export const loadUsers = (): User[] => {
  const data = localStorage.getItem("users");

  let users: User[] = [];
  if (data) {
    users = JSON.parse(data);
  }

  return users;
};

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const addUser = (user: User) => saveUsers([...users, user]);

  const removeUser = (id: string) => saveUsers(users.filter((user) => user.id !== id));

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

  const handleComputeRecommendation = () => {
    nav("ranking");
  };

  return (
    <Box>
      <Typography variant="h3">Smart Sales Companion</Typography>
      <AddUserForm onSubmit={addUser} />
      <Grid container spacing={2} sx={{ my: 2 }}>
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
    </Box>
  );
}

export default Home;
