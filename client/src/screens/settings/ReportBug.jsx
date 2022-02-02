import { makeStyles, Button } from "@material-ui/core";

import { BTN_STYLE, COLOR, SHADOW } from "../../constants";

export default function ReportBug() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Facing any issue, please let us know</p>
      <textarea
        placeholder="Type here something..."
        className={styles.isuueInput}
        cols="30"
        rows="10"
      ></textarea>
      <Button className={styles.btn}>send</Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%",
    height: "100%",
    minHeight: 400,
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBlock: 10,
  },
  isuueInput: {
    outline: "none",
    border: "none",
    minWidth: "100%",
    maxWidth: "100%",
    padding: 10,
    fontSize: 15,
    marginBottom: 30,
    borderRadius: 3,
    boxShadow: SHADOW,
  },
  btn: {
    ...BTN_STYLE,
    marginInline: "auto",
    width: "100%",
    height: 40,
  },
});
