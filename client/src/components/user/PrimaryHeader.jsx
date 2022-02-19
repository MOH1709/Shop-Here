import { makeStyles, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../../constants";
import { Context } from "../../contexts/WidthProvider";
import { Context as CartContext } from "../../contexts/CartProvider";

export default function PrimaryHeader() {
  const styles = useStyles();
  const { width } = useContext(Context); // getting windows width dynamically
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.logo}>SHOP HERE</p>
        {/* <img src="./logo.png" alt="logo" height="50" className={styles.logo} /> */}
        <div className={styles.right}>
          {/* <Button component={NavLink} to={`/city/search`}>
            <img src="./icons/search.svg" alt="search" />
          </Button> */}
          <Button component={NavLink} to={`/city/setting`}>
            <img src="./icons/setting.svg" alt="setting" />
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/home`}
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
          to={width > 700 ? `/city/messages` : `/city/cart`}
          style={({ isActive }) => {
            return isActive
              ? {
                  color: COLOR.SECONDARY,
                  borderBottom: `3.5px solid ${COLOR.SECONDARY}`,
                }
              : { color: "white" };
          }}
        >
          <div
            className={styles.badge}
            style={{
              display: cart.length && width < 700 ? "flex" : "none",
              right: width > 400 ? 30 : 5,
            }}
          >
            {cart.length}
          </div>
          {width > 700 ? "messages" : "cart"}
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
    marginLeft: 20,
    fontFamily: "Baloo Bhaijaan 2",
    color: COLOR.SECONDARY,
    fontWeight: "bold",
    fontSize: 20,
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
  badge: {
    ...FLEX_CENTER,
    position: "absolute",
    top: 0,
    color: "white",
    backgroundColor: COLOR.RED,
    borderRadius: "50%",
    width: 20,
    height: 20,
  },
});
