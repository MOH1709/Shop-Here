import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BTN_STYLE, COLOR, FLEX_CENTER, SHADOW } from "../constants";

export default function ShopDetailBox({ toShow, state, setToShow }) {
  const styles = useStyles();
  const [shop, setShop] = useState({});
  const { businessId } = state;

  useEffect(() => {
    let isMounted = true;

    toShow &&
      axios
        .get(`/bussiness/${businessId}`)
        .then((res) => {
          isMounted && setShop(res.data || {});
        })
        .catch((e) => {
          alert(e);
        });

    return () => {
      isMounted = false;
    };
  }, [businessId, toShow]);

  return (
    <div
      style={{ display: toShow ? "flex" : "none" }}
      className={styles.container}
    >
      <div className={styles.box}>
        <span className={styles.shopImg}>
          <img src={shop.img} alt="shop" />
        </span>
        <p>
          <span> Shop Name</span> <br /> {shop.name}
        </p>
        <p>
          <span>Shop Address</span> <br /> {shop.address}
        </p>
        <p>
          <span> Contact Number</span> <br />
          {shop.extras && shop.extras[0].phoneNumber}
        </p>
        <p>
          <span> Email</span> <br /> {shop.extras && shop.extras[1].email}
        </p>

        <button
          className={styles.btn}
          onClick={() => {
            setToShow(false);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    ...FLEX_CENTER,
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  box: {
    "& p": {
      "& span": {
        color: COLOR.SECONDARY,
        fontWeight: "normal",
      },
      color: COLOR.PRIMARY,
      marginBlock: 15,
      fontWeight: "bold",
      fontSize: 14,
      lineHeight: 1.1,
    },
    boxShadow: SHADOW,
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
    width: "80%",
  },
  shopImg: {
    "& img": {
      height: 80,
      borderRadius: 5,
      objectFit: "contain",
    },

    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 80,
  },
  btn: {
    ...BTN_STYLE,
    width: "100%",
    height: 40,
  },
});
