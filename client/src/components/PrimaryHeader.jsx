import React from "react";
import { makeStyles } from "@material-ui/core";
import { COLOR } from "../constants";

export default function PrimaryHeader() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src="./logo.png" alt="logo" height="50" />
        <div className={styles.right}>
          <img src="./icons/search.svg" alt="search" />
          <img src="./icons/list.svg" alt="list" />
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: "auto",
    height: 100,
    width: "100%",
    zIndex: 999,
    backgroundColor: COLOR.PRIMARY,
  },
  top: {
    "& img": {
      marginInline: 15,
    },
    display: "flex",
    alignItems: "center",
    height: 50,
    // border: "1px solid yellow",
  },
  right: {
    "& img": {
      float: "right",
      marginInline: 15,
    },
    flex: 1,
  },
  bottom: {
    height: 50,

    border: "1px solid red",
  },
});
