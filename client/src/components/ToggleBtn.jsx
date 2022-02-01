import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

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
      marginInline: "auto",
      fontWeight: "bold",
      fontSize: 13,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `2px solid ${COLOR.PRIMARY}`,
    height: 35,
    borderRight: "none",
    borderRadius: 5,
    marginInline: "auto",
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
