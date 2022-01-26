import { Button, makeStyles } from "@material-ui/core";
import { COLOR } from "../constants";

export default function ConsumerMessage({ pin, owners }) {
  const styles = useStyles();

  const clickHandler = () => {};

  return (
    <div className={styles.container} onClick={clickHandler}>
      <p className={styles.orderPin}>
        This Order Code is : <span>{pin}</span>
      </p>
      <p className={styles.shopNames}>
        Shop names : <span>{owners.join(", ")}</span>
      </p>
      <Button className={styles.btn}>click to show more</Button>
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
    textAlign: "center",
    cursor: "pointer",
    marginBlock: 10,
    borderRadius: 5,
    backgroundColor: COLOR.PRIMARY,
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
      color: "rgba(255,255,255,0.4)",
    },
    marginTop: 10,
    overflow: "hidden",
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
