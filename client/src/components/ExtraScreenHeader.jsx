import React from "react";
import { makeStyles } from "@material-ui/core";

export default function ExtraScreenHeader() {
  const styles = useStyles();

  return <div className={styles.container}>ExtraScreenHeader</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
