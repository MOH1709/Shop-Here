import { makeStyles, Button } from "@material-ui/core";
import { useContext } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR } from "../../constants";
import { Context } from "../../contexts/WidthProvider";

export default function PrimaryHeader({ setLocation, location }) {
  const styles = useStyles();
  const { width } = useContext(Context); // getting windows width dynamically
  const { cname } = useParams();
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src="./logo.png" alt="logo" height="50" className={styles.logo} />
        <div className={styles.right}>
          {/* <Button component={NavLink} to={`/${cname}/search`}>
            <img src="./icons/search.svg" alt="search" />
          </Button> */}
          <Button component={NavLink} to={`/${cname}/owner/setting`}>
            <img src="./icons/setting.svg" alt="setting" />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        {width <= 700 && (
          <Button
            className={styles.navBtn}
            component={NavLink}
            to={`/${cname}/owner`}
            style={
              pathname === "/city/owner"
                ? {
                    color: COLOR.SECONDARY,
                    borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                  }
                : { color: "white" }
            }
          >
            Profile
          </Button>
        )}
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/${cname}/owner/messages`}
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
          to={`/${cname}/owner/inventory`}
          style={({ isActive }) => {
            return isActive
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" };
          }}
        >
          Inventory
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
  },
  logo: {
    marginTop: 10,
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
