import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Settings() {
  const styles = useStyles();

  return <div className={styles.container}>Settings</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
