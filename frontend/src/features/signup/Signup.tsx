import { Alert, Button, Container, Grid, TextField } from "@mui/material";
import { BasicAppBar } from "../../common/components/BasicAppBar";
import { useCallback, useEffect, useState } from "react";
import { ApiError, UserService } from "../../api";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    setValidEmail(emailRegex.test(email));
  }, [email]);

  const onSubmit = useCallback(async () => {
    setError("");
    try {
      await UserService.userControllerSignup({ email: email });
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.body.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }, [email]);

  return (
    <Container maxWidth={"sm"}>
      <BasicAppBar text={"Signup"} />
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
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant={"contained"} onClick={onSubmit} disabled={!validEmail}>
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
