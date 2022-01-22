import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Message() {
  const styles = useStyles();

  return <div className={styles.container}>Message</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
