import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { COLOR, SHADOW } from "../constants";

export default function ToggleBtn({
  onClickHandler,
  title,
  Style,
  initialState,
}) {
  const styles = useStyles();
  const [isClicked, setIsClicked] = useState(initialState || false);

  const clickHandler = () => {
    setIsClicked(!isClicked);
    onClickHandler(isClicked);
  };

  return (
    <div className={styles.container} style={Style}>
      <p>{title}</p>
      <Button
        className={styles.btnDiv}
        onClick={clickHandler}
        style={{
          justifyContent: isClicked ? "flex-end" : "flex-start",
          backgroundColor: isClicked ? COLOR.SECONDARY : COLOR.PRIMARY,
        }}
      >
        <div className={styles.btn}></div>
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& p": {
      flex: 1,
      fontWeight: "bold",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 3,
    boxShadow: SHADOW,
    // border: `2px solid rgba(0,0,0,0.5)`,
  },
  btnDiv: {
    width: 90,
    height: 35,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    paddingInline: 8,
    borderRadius: 5,
  },
  btn: {
    width: 22,
    height: 22,
    borderRadius: 3,
    backgroundColor: "white",
  },
});
