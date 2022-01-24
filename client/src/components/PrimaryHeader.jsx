import { makeStyles, Button } from "@material-ui/core";
import { useContext } from "react";

import { BTN_STYLE, COLOR } from "../constants";
import { Context } from "../contexts/WidthProvider";

export default function PrimaryHeader({ setLocation, location }) {
  const styles = useStyles();
  const { width } = useContext(Context); // getting windows width dynamically

  // chnaging primary screen route if width changes
  if (width > 700 && location === "/cart") {
    setLocation("/home");
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src="./logo.png" alt="logo" height="50" />
        <div className={styles.right}>
          <Button onClick={() => setLocation("/search")}>
            <img src="./icons/search.svg" alt="search" />
          </Button>
          <Button onClick={() => setLocation("/setting")}>
            <img src="./icons/setting.svg" alt="setting" />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button
          onClick={() => setLocation("/home")}
          style={
            location === "/home"
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" }
          }
        >
          Home
        </Button>
        <Button
          onClick={() => setLocation("/messages")}
          style={
            location === "/messages"
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" }
          }
        >
          Messages
        </Button>
        <Button
          onClick={() => setLocation("/cart")}
          style={
            location === "/cart"
              ? {
                  display: width <= 700 ? "flex" : "none",
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white", display: width <= 700 ? "flex" : "none" }
          }
        >
          Cart
        </Button>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    height: 100,
    width: "100%",
    zIndex: 10,
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
    "& NavLink": {
      height: 50,
    },
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  bottom: {
    "& Button": {
      ...BTN_STYLE,
      flex: 1,
      height: 40,
      marginInline: 5,
      fontSize: 13,
    },
    height: 50,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
