import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function SignIn(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isCredentialValid = (email, password) => {
    if (email.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isCredentialValid(email, password)) {
      alert("Username cannot be empty!");
      return;
    } else {
      const userType = password.toLowerCase() === "admin" ? "admin" : "client";
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess({
          username: email,
          userType,
          loggedIn: true,
        });
      }, "2000");
    }
  };

  const onSuccess = (res) => {
    props.changeLoggedInStateHandler(res);
  };

  const loading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  };

  const displayForm = () => (
    <Box noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 4 }}
      >
        Sign In
      </Button>
    </Box>
  );

  const theme = createTheme();

  return (
    <div
      style={{
        backgroundColor: "#1976d2",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          width: 450,
          height: 500,
          [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
          },
        }}
      >
        {isLoading ? (
          loading()
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {displayForm()}
          </>
        )}
      </Card>
    </div>
  );
}
