import { makeStyles } from "@material-ui/core";

import Router from "./Router";

export default function App() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Router />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 1338,
    minHeight: "100vh",
    marginInline: "auto",
    borderRadius: 5,
    backgroundColor: "white",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.6)",
  },
});
