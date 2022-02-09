import { makeStyles } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { PrimaryHeader, SecondaryHeader } from "../components/user";
import { MiddleWare } from "../components";
import { Context } from "../contexts/WidthProvider";

//----------------------------------------------->
import { Cart } from "./primary";

export default function MainScreen() {
  const styles = useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useContext(Context);

  useEffect(() => {
    if (width > 700 && pathname === "/city/cart") {
      navigate("/city/home");
    }
  }, [width, navigate, pathname]);

  return (
    <>
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
