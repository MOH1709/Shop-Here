import React from "react";
import { makeStyles } from "@material-ui/core";

export default function App() {
  const styles = useStyles();

  return <div className={styles.container}></div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
