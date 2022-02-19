import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { COLOR, FLEX_CENTER } from "../../constants";

export default function ProductCard({ state, onClickHandler }) {
  const styles = useStyles();
  const { img, name, MRP, quantity, price, isAdded } = state;

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (quantity > 0) {
          onClickHandler({ ...state, avail: quantity }, !isAdded);
        } else {
          alert(`${name} is out of stock for now😟`);
        }
      }}
    >
      <div className={styles.img}>
        <img src={img || "./logo.png"} alt="img" />
      </div>
      <div className={styles.contentDiv}>
        <p>{name}</p>
        <p>{price} ₹</p>
        <p>
          {quantity > 0 ? `${MRP || ""} ${MRP ? "₹" : ""}` : `out of stock`}
        </p>
      </div>
      <Button
        className={styles.btn}
        style={{ color: isAdded ? COLOR.RED : COLOR.GREEN }}
      >
        {isAdded ? "Remove" : "Add To Cart"}
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    padding: 10,
    paddingLeft: 0,
    marginBlock: 10,
    cursor: "pointer",
    display: "flex",
  },
  img: {
    "& img": {
      width: 60,
      height: 60,
      objectFit: "cover",
      borderRadius: "50%",
    },
    ...FLEX_CENTER,
    width: "30%",
    maxWidth: 100,
    minWidth: 80,
  },
  contentDiv: {
    "& :first-child": {
      width: "90%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",

      fontWeight: 500,
    },
    "& :nth-child(2)": {
      color: COLOR.GREEN,
      fontWeight: "bold",
      marginBottom: -3,
    },
    "& :nth-child(3)": {
      color: COLOR.RED,
      marginTop: -10,
      fontSize: 13,
      textDecoration: "line-through",
    },
    flex: 1,
    fontSize: 15,
    overflow: "hidden",
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
  btn: {
    position: "absolute",
    top: 30,
    right: 10,
    fontWeight: "bold",
    fontSize: 12,
  },
});
