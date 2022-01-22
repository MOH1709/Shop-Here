import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { BTN_STYLE, COLOR } from "../constants";

export default function CartCard({ img, name, q, price, shopName }) {
  const styles = useStyles();
  const [quantity, setQuantity] = useState(parseInt(q) || 1);
  const [total, setTotal] = useState(parseInt(price));

  return (
    <div
      className={styles.container}
      style={{ display: quantity > 0 ? "flex" : "none" }}
    >
      <div className={styles.left}>
        <img src={img || "./logo.png"} alt="product" className={styles.img} />
        <div className={styles.qDiv}>
          <Button
            onClick={() => {
              setQuantity(quantity + 1);
              setTotal(total + parseInt(price));
            }}
          >
            +
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={() => {
              setQuantity(quantity - 1);
              setTotal(total - parseInt(price));
            }}
          >
            {quantity === 1 ? (
              <img src="./icons/delete.svg" alt="delete" height="20" />
            ) : (
              "-"
            )}
          </Button>
        </div>
      </div>
      <div className={styles.detail}>
        <p className={styles.name}>{name}</p>
        <div className={styles.shopName}>{shopName}</div>
        <p className={styles.total}>
          <span>TOTAL : </span> ₹{total}
        </p>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    minHeight: 120,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  left: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  img: {
    marginLeft: 10,
    borderRadius: 5,
    height: 100,
  },
  qDiv: {
    "& Button": {
      ...BTN_STYLE,
      height: 35,
      fontSize: 20,
      color: "white",
    },
    "& span": {
      fontWeight: "bold",
    },

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    marginInline: 20,
  },
  detail: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "100%",
    minWidth: 200,
    height: 100,
    borderBottom: `2px solid rgba(0,0,0,0.5)`,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  shopName: {
    fontSize: 15,
    overflow: "hidden",
    opacity: 0.5,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  total: {
    "& span": {
      color: COLOR.PRIMARY,
    },
    color: COLOR.GREEN,
    fontWeight: "bold",
  },
});
