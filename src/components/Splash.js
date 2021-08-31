import { CircularProgress, makeStyles } from "@material-ui/core";

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function LoaderProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={65}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        size={65}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const Splash = () => {
  return (
    <div
      style={{ marginTop: "40vh", display: "flex", justifyContent: "center" }}
    >
      <LoaderProgress />
    </div>
  );
};

export default Splash;
