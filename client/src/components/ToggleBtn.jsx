import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function ToggleBtn({ onClickHandler }) {
  const styles = useStyles();
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    // onClickHandler();
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <p>Urgent</p>
      <div
        className={styles.btnDiv}
        onClick={clickHandler}
        style={{ justifyContent: isClicked ? "flex-end" : "flex-start" }}
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
      marginInline: 5,
    },
    display: "flex",
    alignItems: "center",
    height: 35,
    width: 180,
    border: `2px solid ${COLOR.PRIMARY}`,
  },
  btnDiv: {
    display: "flex",
    alignItems: "center",
    paddingInline: 8,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 5,
    width: 100,
    height: 35,
  },
  btn: {
    width: 22,
    height: 22,
    borderRadius: 3,
    backgroundColor: "white",
  },
});
