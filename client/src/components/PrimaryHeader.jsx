import { makeStyles, Button } from "@material-ui/core";
import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";

import { BTN_STYLE, COLOR } from "../constants";
import { Context } from "../contexts/WidthProvider";

export default function PrimaryHeader({ setLocation, location }) {
  const styles = useStyles();
  const { width } = useContext(Context); // getting windows width dynamically
  const { cityid } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src="./logo.png" alt="logo" height="50" />
        <div className={styles.right}>
          <Button component={NavLink} to={`/${cityid}/search`}>
            <img src="./icons/search.svg" alt="search" />
          </Button>
          <Button component={NavLink} to={`/${cityid}/setting`}>
            <img src="./icons/setting.svg" alt="setting" />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button
          component={NavLink}
          to={`/${cityid}/home`}
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
          component={NavLink}
          to={`/${cityid}/messages`}
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
        {width <= 700 && (
          <Button
            component={NavLink}
            to={`/${cityid}/cart`}
            style={({ isActive }) => {
              return isActive
                ? {
                    color: COLOR.SECONDARY,
                    borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                  }
                : { color: "white" };
            }}
          >
            Cart
          </Button>
        )}
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
