import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { setAuth, validateAuth } from "../utils/LocalStorageUtil";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../components/Copyright";
import { Form } from "../components/form/form";
import { logIn } from "../API/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -12,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage({ history }) {
  const classes = useStyles();

  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = (data) => console.log(data);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    logIn({ username: username, password: pass, login_request: role })
      .then((res) => {
        console.log(res);
        setAuth(res);
        setLoading(false);
        const auth = setAuth(res);
        console.log(auth);
        if (validateAuth(auth)) {
          history.push("/");
        } else {
          console.log("validation failed");
        }
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
    // console.log(token);
    // setAuth(token)
    // console.log(username, pass, role);
    setRole("");
    // setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
          />

          <FormControl required fullWidth margin="normal">
            <InputLabel variant="outlined">Role</InputLabel>
            <Select
              label="Role"
              variant="outlined"
              value={role}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
              onClick={handleLogin}
            >
              Log In
            </Button>
            {loading && (
              <CircularProgress
                thickness={5}
                size={24}
                className={classes.buttonProgress}
              />
            )}
          </div>
        </Form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;
