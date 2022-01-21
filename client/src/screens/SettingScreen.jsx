import React from "react";
import { makeStyles } from "@material-ui/core";

export default function SettingScreen() {
  const styles = useStyles();

  return <div className={styles.container}>Setting</div>;
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
