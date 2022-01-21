import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Cart() {
  const styles = useStyles();

  return <div className={styles.container}>Cart</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
