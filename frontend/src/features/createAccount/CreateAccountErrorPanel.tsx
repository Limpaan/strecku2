import { Alert, AlertTitle, Grid } from "@mui/material";
import { FC } from "react";
import { BasicAppBar } from "../../common/components/BasicAppBar";

interface Props {
  title: string;
  message: string;
}

export const CreateAccountErrorPanel: FC<Props> = ({ title, message }) => {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <BasicAppBar text={"Create Account"} />
      <Alert severity={"error"}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Grid>
  );
};
