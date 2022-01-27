import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function InputBox({
  title,
  onChangeHandler,
  Style,
  name,
  type,
  value,
}) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={Style}>
      <label htmlFor={title}>{title}</label>
      <input
        id={title}
        type={type ?? "text"}
        name={name}
        value={value}
        onChange={onChangeHandler}
        required
      />
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
    },
    "& label": {
      marginBottom: 5,
      fontWeight: "bold",
      color: COLOR.PRIMARY,
    },
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
});
