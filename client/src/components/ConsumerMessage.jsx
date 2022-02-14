import { Button, makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom Components
import { BTN_STYLE, COLOR, SHADOW } from "../constants";

export default function ConsumerMessage({ pin, owners, onClickHandler }) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.orderPin}>
        This Order Code is : <span>{pin}</span>
      </p>
      <p className={styles.shopNames}>
        Shop name : <span>{owners.join(", ")}</span>
      </p>
      <Button className={styles.btn} onClick={onClickHandler}>
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
    padding: 10,
    flexDirection: "column",
    textAlign: "center",
    cursor: "pointer",
    marginBlock: 10,
    borderRadius: 5,
    color: "black",
    boxShadow: SHADOW,
  },
  orderPin: {
    "& span": {
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
  },
  shopNames: {
    "& span": {
      fontSize: 12,
      color: "rgba(0,0,0,0.4)",
    },
    marginTop: 10,
    overflow: "hidden",
  },
  btn: {
    ...BTN_STYLE,
    marginTop: 10,
    padding: 5,
    fontSize: 12,
    width: "100%",
    // color: COLOR.PRIMARY,
    // border: `2px solid ${COLOR.PRIMARY}`,
  },
});
