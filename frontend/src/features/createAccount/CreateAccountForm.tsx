import { FC, useCallback, useState } from "react";
import { Alert, Button, Container, Grid, TextField } from "@mui/material";
import { ApiError, UserService } from "../../api";
import { BasicAppBar } from "../../common/components/BasicAppBar";

interface Props {
  email: string;
  token: string;
}

export const CreateAccountForm: FC<Props> = ({ email, token }) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(async () => {
    setError("");
    try {
      await UserService.userControllerCreateAccount({
        email: email,
        name: name,
        password: password,
        token: token,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.body.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }, [token, email, name, password]);

  return (
    <Container maxWidth={"sm"}>
      <BasicAppBar text={"Create Account"} />
      <Grid
        container
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"16px"}
        padding={"16px"}
        sx={{ height: "100vh", maxWidth: "sm" }}
      >
        <TextField
          id={"email"}
          label={"Email"}
          value={email}
          disabled={true}
          fullWidth
        />
        <TextField
          id={"name"}
          label={"Name"}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id={"password"}
          label={"Password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant={"contained"} onClick={onSubmit}>
          Submit
        </Button>
        <Alert
          sx={{ visibility: error ? "visisble" : "hidden" }}
          severity={"error"}
        >
          {error}
        </Alert>
      </Grid>
    </Container>
  );
};
