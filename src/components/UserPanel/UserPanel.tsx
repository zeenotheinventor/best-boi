import React from "react";
import { Stats, User } from "../../pages/types";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
  onRemoveUser: (id: string) => void;
  onStatsChange: (id: string, stats: Stats) => void;
}
const UserPanel = ({ user, onRemoveUser, onStatsChange }: Props) => {
  const { name, id, stats } = user;
  const { register } = useForm({ defaultValues: stats });

  const labels = ["Interviews", "Client Calls", "CVs", "Deals"];
  const valueLabels = ["interviews", "client_calls", "cvs", "deals"];

  const renderStatLabel = (label: string) => {
    return (
      <Grid item key={label} sx={{ py: 1.4 }}>
        {label}
      </Grid>
    );
  };

  const renderStatValue = (name: string, i: number) => {
    return (
      <Grid item key={i}>
        <TextField
          {...register(name as keyof Stats, {
            onChange(e) {
              onStatsChange(id, { ...stats, [name]: e.target.value });
            },
          })}
          size="small"
          sx={{ width: 70, ml: 1 }}
          defaultValue={0}
        />
      </Grid>
    );
  };

  return (
    <form key={id}>
      <Grid container spacing={2}>
        <Grid item>
          <Grid item sx={{ py: 1.4 }}>
            {name}
          </Grid>
        </Grid>
        <Grid item>{labels.map(renderStatLabel)}</Grid>
        <Grid item>{valueLabels.map(renderStatValue)}</Grid>
        <Grid item>
          <Grid item>
            <IconButton onClick={() => onRemoveUser(id)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserPanel;
