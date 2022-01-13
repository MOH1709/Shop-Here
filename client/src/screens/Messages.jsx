import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Messages() {
  const styles = useStyles();

  return <div className={styles.container}>Messages</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
