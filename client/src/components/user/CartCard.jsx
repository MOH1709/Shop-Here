import { useContext, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom Components
import { BTN_STYLE, COLOR } from "../../constants";

//-----------------------------------------------> custom components
import { Context } from "../../contexts/CartProvider";

export default function CartCard({ state }) {
  const styles = useStyles();
  const { img, name, quantity, price, address, _id, avail } = state;
  const [total, setTotal] = useState(parseInt(price) * quantity);
  const { cart, setCart } = useContext(Context);

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
              if (quantity < avail) {
                setCart(
                  cart.map((data) => {
                    if (data._id === _id) {
                      return { ...data, quantity: quantity + 1 };
                    }
                    return data;
                  })
                );
                setTotal(total + parseInt(price));
              }
            }}
            style={{ fontSize: quantity < avail ? 20 : 12 }}
          >
            {quantity < avail ? "+" : "MAX"}
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={() => {
              setCart(
                cart.map((data) => {
                  if (data._id === _id) {
                    return { ...data, quantity: quantity - 1 };
                  }
                  return data;
                })
              );

              setTotal(total - parseInt(price));

              if (quantity === 1) {
                setCart(
                  cart.filter((data) => {
                    return data._id !== _id;
                  })
                );
              }
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
        <p className={styles.address}>{address}</p>
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
    paddingBlock: 5,
    marginInline: 10,
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
  address: {
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
