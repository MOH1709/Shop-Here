import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { COLOR, FLEX_CENTER } from "../../constants";

export default function ProductCard({ state, onClickHandler }) {
  const styles = useStyles();
  const { img, name, MRP, price, quantity } = state;

  return (
    <div
      className={styles.container}
      onClick={() => {
        onClickHandler();
      }}
    >
      <div className={styles.img}>
        <img src={img || "./logo.png"} alt="img" />
      </div>
      <div className={styles.contentDiv}>
        <p>{name}</p>
        <p>{price} ₹</p>
        <p>
          {MRP || ""} {!MRP || "₹"}
        </p>
        <p>{quantity ? "quantity : " + quantity : "out of stock"}</p>
      </div>
      <Button className={styles.btn}>click to edit</Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
    padding: 10,
    paddingLeft: 0,
    marginBlock: 10,
    cursor: "pointer",
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
