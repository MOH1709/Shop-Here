import { useState } from "react";
import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function ToggleBtn({ onClickHandler }) {
  const styles = useStyles();
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    onClickHandler();
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <p>Urgent</p>
      <div
        className={styles.btnDiv}
        onClick={clickHandler}
        style={{
          justifyContent: isClicked ? "flex-end" : "flex-start",
          backgroundColor: isClicked ? COLOR.SECONDARY : COLOR.PRIMARY,
        }}
      >
        <div className={styles.btn}></div>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& p": {
      marginInline: 20,
    },
    display: "flex",
    alignItems: "center",
    height: 35,
    border: `2px solid ${COLOR.PRIMARY}`,
    borderRight: "none",
    borderRadius: 5,
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
