import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR } from "../../constants";

export default function OwnerMessage({ name, address }) {
  const styles = useStyles();
  const clickHandler = () => {};

  return (
    <div className={styles.container}>
      <p className={styles.name}>
        Name : <span>{name}</span>
      </p>
      <p className={styles.address}>
        Address : <span>{address}</span>
      </p>
      <div className={styles.inputDiv}>
        <input type="text" placeholder="Enter Code" />
        <Button>confirm</Button>
      </div>
      <Button className={styles.btn} onClick={clickHandler}>
        click to show more
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    margin: 10,
    color: "white",
    padding: 10,
    flexDirection: "column",
    cursor: "pointer",
    marginBlock: 10,
    borderRadius: 5,
    backgroundColor: COLOR.PRIMARY,
  },
  name: {
    "& span": {
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    paddingLeft: 10,
  },
  address: {
    "& span": {
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
    },
    paddingLeft: 10,
    overflow: "hidden",
  },
  inputDiv: {
    "& Button": {
      ...BTN_STYLE,
      fontSize: 12,
      color: COLOR.PRIMARY,
      backgroundColor: COLOR.SECONDARY,
    },
    "& input": {
      flex: 1,
      minWidth: 10,
      paddingInline: 10,
      border: "none",
      outline: "none",
      borderRadius: 3,
    },
    display: "flex",
    marginBlock: 20,
  },
  btn: {
    color: COLOR.SECONDARY,
    marginTop: 10,
    padding: 5,
    fontSize: 12,
    width: "100%",
    border: `2px solid ${COLOR.SECONDARY}`,
  },
});
