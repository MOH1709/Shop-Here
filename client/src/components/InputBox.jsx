import { makeStyles } from "@material-ui/core";

import { COLOR } from "../constants";

export default function InputBox({
  title,
  onChangeHandler,
  Style,
  name,
  type,
  value,
  autoFocus,
}) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={Style}>
      <label htmlFor={title}>{title}</label>
      <div className={styles.inputDiv}>
        <input
          autoFocus={autoFocus || false}
          id={title}
          type={type ?? "text"}
          name={name}
          maxLength="50"
          value={value > 100000000000 ? 0 : value || ""}
          // placeholder="type here"
          onChange={onChangeHandler}
        />
        <img src="./icons/edit.svg" alt="img" />
      </div>
    </div>
  );
}

//-----------------------------------------------> custom styles
const useStyles = makeStyles({
  container: {
    "& label": {
      marginBottom: 5,
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
  inputDiv: {
    "& input": {
      flex: 1,
      border: "none",
      outline: "none",
      paddingLeft: 3,
      borderRadius: 3,
    },
    "& img": {
      height: 20,
      opacity: 0.8,
    },
    display: "flex",
    paddingBlock: 1,
  },
});
