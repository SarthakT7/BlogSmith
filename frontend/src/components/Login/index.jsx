import { useState } from "react";
// import { Link as link} from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import { GoogleIcon } from "@mui/icons-material";
import axios from "axios";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";

const theme = createTheme();

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL = "http://localhost:4000/api/auth";
      const { data: res } = await axios.post(URL, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.message);
      }
    }
  };
  return (
    <>
      {/* <h1>Welcome to Log In Page</h1>
            <Link to="/signup">Go to Sign Up Page</Link>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name='email' value={data.email} onChange={handleChange} required />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} required />
                {error && <div>{error}</div>} 
                <button type="submit">Sign In</button>
            </form> */}

      <ThemeProvider theme={theme}>
        <Grid
          item
          container
          justifyContent="right"
          alignItems="center"
          paddingRight="150px"
          xs={12}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
            // display: "flex",
            // flexDirection: "row",
          }}
        >
          <Grid
            item
            component={Paper}
            elevation={1}
            square
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center-vertical",
              alignItems: "center",
              bgcolor: "background.paper",
              height: "70vh",
              width: "50%",
              borderRadius: "30px",
              flexDirection: "column",
              opacity: 0.9,
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    textAlign: "left",
                    marginTop: "-50px",
                  }}
                >
                  Welcome to BlogSmith
                </Typography>

                <Link
                  to="/signup"
                  href="#"
                  variant="body2"
                  sx={{ marginLeft: "50px" }}
                >
                  {"Don't have an account?\n Sign Up"}
                </Link>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  borderRadius: 100,
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </ThemeProvider>
    </>
  );
};

export default Login;
