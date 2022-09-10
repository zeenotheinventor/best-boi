import { Button, TextField } from "@mui/material";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { User } from "./types";

interface Props {
  onSubmit: (user: User) => void;
}
const AddUserForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });
  const submitAddUserForm = ({ name }: FieldValues): void => {
    reset();
    onSubmit({
      name,
      id: v4(),
      stats: { client_calls: 0, cvs: 0, deals: 0, interviews: 0 },
    });
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit((a) => {
          submitAddUserForm(a);
        })(e);
      }}
    >
      <TextField {...register("name")} size="small" />

      <Button type="submit">Add User</Button>
    </form>
  );
};

export default AddUserForm;
