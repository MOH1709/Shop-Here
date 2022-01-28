import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
// import { Outlet } from "react-router-dom";

//-----------------------------------------------> custom components
import { SecondaryHeader } from "../components/user";
import { Context } from "../contexts/WidthProvider";

export default function Owner() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <>
      <div className={styles.primary}>{/* <Outlet /> */}</div>
      <div
        className={styles.secondary}
        style={{ display: width > 700 ? "flex" : "none" }}
      >
        <SecondaryHeader />
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
