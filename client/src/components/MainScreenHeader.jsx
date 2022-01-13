import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { COLOR, FLEX_CENTER } from "../constants";
import { Context } from "../contexts/WidthProvider";
import { NavLink } from "react-router-dom";

export default function MainScreenHeader() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logoDiv}>
          <img src="./logo.png" alt="logo" width="45" height="45" />
        </div>
        <span>
          <img src="./icons/search.svg" alt="search icon" />
        </span>
        <span>
          <img src="./icons/list.svg" alt="open list icon" />
        </span>
      </div>
      <nav className={styles.nav}>
        <Button component={NavLink} to="/home" className={styles.navBtn}>
          home
        </Button>
        <Button component={NavLink} to="/messages" className={styles.navBtn}>
          messages
        </Button>
        <Button
          component={NavLink}
          to="/cart"
          style={{ display: width < 600 ? "flex" : "none" }}
          className={styles.navBtn}
        >
          cart
        </Button>
      </nav>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: COLOR.PRIMARY,
    height: 90,
  },
  top: {
    "& div": {
      flex: 1,
      paddingLeft: 20,
    },
    "& span": {
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.3)",
      },
      ...FLEX_CENTER,

      width: 45,
      height: 45,
    },
    display: "flex",
    height: 40,
    width: "100%",
  },
  nav: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-evenly",
  },
  navBtn: {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    color: "white",
    width: "100%",
  },
  active: {
    backgroundColor: "red",
  },
});
