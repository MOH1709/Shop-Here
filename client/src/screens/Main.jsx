import { makeStyles } from "@material-ui/core";
import { useContext } from "react";

import { PrimaryHeader, SecondaryHeader } from "../components";
import { Context } from "../contexts/WidthProvider";
import { Cart } from ".";
import { PrimaryRouter } from "../routes";

export default function Main() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <>
      <div className={styles.primary}>
        <PrimaryHeader />
        <PrimaryRouter />
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
