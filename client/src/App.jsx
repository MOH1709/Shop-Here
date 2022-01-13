import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { MainScreenHeader, ExtraScreenHeader } from "./components";
import { Context } from "./contexts/WidthProvider";
import Router from "./Router";

export default function App() {
  const styles = useStyles();
  const { width } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.mainScreen}>
        <MainScreenHeader />
        <Router />
      </div>
      <div
        className={styles.extraScreen}
        style={{ display: width < 600 ? "none" : "block" }}
      >
        <ExtraScreenHeader />
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    display: "flex",

    minHeight: "100vh",
    maxWidth: 1388,
    marginInline: "auto",

    backgroundColor: "white",
    boxShadow: "0px 3px 30px rgb(0,0,0,0.6)",
  },
  mainScreen: {
    flex: 1,
    minWidth: 280,

    borderRight: "2px solid black",
  },
  extraScreen: {
    flex: 3,
    minWidth: 280,
  },
});
