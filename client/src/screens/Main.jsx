import { makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";

import { SecondaryHeader, PrimaryHeader } from "../components";
import { Context } from "../contexts/WidthProvider";
import { PrimaryMainRouter } from "../routers";
// import { Cart } from "./primary";

export default function MainScreen() {
  const styles = useStyles();
  const { width } = useContext(Context);
  const [location, setLocation] = useState("/home");

  return (
    <>
      <div className={styles.primary}>
        <PrimaryHeader setLocation={setLocation} location={location} />
        <PrimaryMainRouter location={location} />
      </div>
      <div
        className={styles.secondary}
        style={{ display: width > 700 ? "flex" : "none" }}
      >
        <SecondaryHeader />
        {/* <Cart /> */}
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
