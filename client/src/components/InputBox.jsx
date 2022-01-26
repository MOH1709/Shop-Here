import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function InputBox({ title, onChangeHandler, Style, name }) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={Style}>
      <p>{title}</p>
      <input type="text" name={name} onChange={onChangeHandler} required />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& input": {
      width: "100%",
      border: "none",
      outline: "none",
      letterSpacing: 1,
      borderBottom: "2px solid rgba(0,0,0,0.5)",
    },
    "& p": {
      marginBottom: 5,
      fontWeight: "bold",
      color: COLOR.PRIMARY,
    },
  },
});
