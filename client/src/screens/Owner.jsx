import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

//-----------------------------------------------> custom components
import { MiddleWare } from "../components";
import { PrimaryHeader } from "../components/owner";
import { Context } from "../contexts/WidthProvider";
import { OwnerHome } from "./owners";

export default function Owner() {
  const styles = useStyles();
  const { width } = useContext(Context);

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
        <OwnerHome />
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
