import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Search() {
  const styles = useStyles();

  return <div className={styles.container}>Search</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
