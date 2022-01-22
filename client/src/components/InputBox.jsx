import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function InputBox({ title, onChangeHandler, Style, name }) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={Style}>
      <input type="text" name={name} onChange={onChangeHandler} />
      <p>{title}</p>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& input": {
      outline: "none",
      borderRadius: 4,
      height: "100%",
      width: "100%",
      paddingInline: 5,
      border: `2px solid ${COLOR.SECONDARY}`,
      borderLeft: `15px solid ${COLOR.SECONDARY}`,
      color: COLOR.PRIMARY,
      fontWeight: "lighter",
      fontSize: 15,
    },
    "& p": {
      position: "absolute",
      top: -12,
      left: 15,
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 1,
      paddingInline: 5,
      color: COLOR.PRIMARY,
      backgroundColor: "white",
    },
    position: "relative",
    marginInline: "auto",
    width: "100%",
    height: 50,
  },
});
