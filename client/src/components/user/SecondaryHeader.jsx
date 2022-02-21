import { makeStyles } from "@material-ui/core";
import { useContext } from "react";

//-----------------------------------------------> custom components
import { COLOR } from "../../constants";
import { Context } from "../../contexts/CartProvider";

export default function SecondaryHeader() {
  const styles = useStyles();
  const { cart } = useContext(Context);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Cart</p>
      <p className={styles.shops}>
        {cart.length
          ? cart
              .map((data, index) => {
                try {
                  if (cart[index - 1]?.address !== cart[index].address) {
                    return data.address.split(",")[0];
                  }
                  return "";
                } catch (e) {
                  return "Halol Shops";
                }
              })
              .join(", ")
          : "Cart is Empty !!"}
      </p>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 30,
    zIndex: 10,
    color: "white",
    backgroundColor: COLOR.PRIMARY,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
  },
  shops: {
    opacity: 0.5,
    color: COLOR.SECONDARY,
    height: "1.5em",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});
