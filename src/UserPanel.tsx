import React from "react";
import { Stats, User } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  user: User;
  onRemoveUser: (id: string) => void;
  onStatsChange: (id: string, stats: Stats) => void;
}
const UserPanel = ({ user, onRemoveUser, onStatsChange }: Props) => {
  const { name, id, stats } = user;
  const { register, handleSubmit } = useForm({ defaultValues: stats });

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
          {...register(name as keyof Stats)}
          size="small"
          sx={{ width: 70, ml: 1 }}
          defaultValue={0}
        />
      </Grid>
    );
  };

  const handleUpdateUser = ({
    interviews,
    client_calls,
    deals,
    cvs,
  }: FieldValues) => {
    console.log({
      interviews,
      client_calls,
      deals,
      cvs,
    });
    onStatsChange(id, {
      interviews,
      client_calls,
      deals,
      cvs,
    });
  };

  return (
    <form
      key={id}
      onSubmit={(e) => {
        handleSubmit((a) => {
          handleUpdateUser(a);
        })(e);
      }}
    >
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
          <Grid item>
            <Button type="submit">Update</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserPanel;
