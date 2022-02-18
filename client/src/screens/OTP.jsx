import { makeStyles, Button } from "@material-ui/core";

import { SHADOW, BTN_STYLE } from "../constants";

export default function OTP() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2>ENTER OTP</h2>
      <input
        type="number"
        autoFocus={true}
        placeholder="Enter otp here..."
        className={styles.input}
      />
      <Button className={styles.btn} id="sign-in-button">
        confirm
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    margin: "auto",
    height: "50%",
    width: "90%",
    maxWidth: 600,
    boxShadow: SHADOW,
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: 40,
    paddingInline: 10,
    border: "none",
    outline: "none",
    boxShadow: SHADOW,
    borderRadius: 5,
  },
  btn: {
    ...BTN_STYLE,
    width: "90%",
    height: 40,
  },
});
