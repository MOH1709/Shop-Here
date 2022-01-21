import React from "react";
import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function SecondaryHeader() {
  const styles = useStyles();

  return <div className={styles.container}></div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: COLOR.PRIMARY,
    height: 95,
  },
});
