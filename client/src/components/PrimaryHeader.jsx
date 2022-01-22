import { makeStyles, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { BTN_STYLE, COLOR, SHADOW } from "../constants";
import { Context } from "../contexts/WidthProvider";

export default function PrimaryHeader() {
  const styles = useStyles();
  const [showSetting, setShowSetting] = useState(false);
  const { width } = useContext(Context);

  const hideSetting = () => {
    setShowSetting(false);

    return document.removeEventListener("mouseup", hideSetting);
  };

  if (showSetting) {
    document.addEventListener("mouseup", hideSetting);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* //------------------------------------------------- */}

        <div
          className={styles.setting}
          style={{ display: showSetting ? "flex" : "none" }}
        >
          <Button>My Profile</Button>
          <Button>Be Seller</Button>
          <Button>My Bills</Button>
          <Button>Updates & Info</Button>
          <Button>Want a product</Button>
          <Button>Report a Bug</Button>
          <Button>Log Out</Button>
        </div>

        {/* //------------------------------------------------- */}
        <img src="./logo.png" alt="logo" height="50" />
        <div className={styles.right}>
          <Button>
            <img src="./icons/search.svg" alt="search" />
          </Button>
          <Button
            onClick={() => {
              setShowSetting(true);
            }}
          >
            <img src="./icons/list.svg" alt="list" />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to="/home"
          style={({ isActive }) => {
            return isActive
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" };
          }}
        >
          Home
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to="/messages"
          style={({ isActive }) => {
            return isActive
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" };
          }}
        >
          Messages
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to="/cart"
          style={({ isActive }) => {
            return isActive
              ? {
                  display: width <= 700 ? "flex" : "none",
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white", display: width <= 700 ? "flex" : "none" };
          }}
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
    "& Button": {
      height: 50,
    },
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  setting: {
    "& Button": {
      borderBottom: "1px solid rgba(0,0,0,0.5)",
      marginBlock: 10,
      borderRadius: 0,
      width: 200,
      justifyContent: "flex-start",
      color: COLOR.PRIMARY,
      fontWeight: "bold",
    },
    position: "absolute",
    top: 30,
    right: 30,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    backgroundColor: "white",
    boxShadow: SHADOW,
    borderRadius: 2,
    zIndex: 13,
  },
  bottom: {
    height: 50,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  navBtn: {
    ...BTN_STYLE,
    flex: 1,
    height: 40,
    marginInline: 5,
    fontSize: 13,
  },
});
