import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

//-----------------------------------------------> custom components
import { PrimaryHeader, SecondaryHeader, MiddleWare } from "../components";
import { CartProvider } from "../contexts";
import { Context } from "../contexts/WidthProvider";
import { Cart } from "./primary";

export default function MainScreen() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <>
      <CartProvider>
        <MiddleWare />
        <div className={styles.primary}>
          <PrimaryHeader />
          <Outlet />
        </div>
        <div
          className={styles.secondary}
          style={{ display: width > 700 ? "flex" : "none" }}
        >
          <SecondaryHeader />
          <Cart />
        </div>
      </CartProvider>
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  primary: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: 280,
  },
  secondary: {
    flex: 2,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid black",
  },
});
