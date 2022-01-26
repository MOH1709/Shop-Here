import { makeStyles, Button } from "@material-ui/core";
import { useState } from "react";

import { CartCard, InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";

export default function Cart() {
  const styles = useStyles();
  const [input, setInput] = useState({
    total: 0,
    address: "",
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <CartCard
        price="10"
        q="1"
        shopName="Mahavir general store, sb nagar pavagadh road halol"
        name="fanta drink 200ml"
        img="./test.jpg"
      />
      <div className={styles.order}>
        <InputBox
          title="Full Address"
          name="address"
          Style={{ width: "80%", marginBlock: 30, marginInline: "auto" }}
          onChangeHandler={onChangeHandler}
        />
        <div className={styles.total}>
          <p>
            TOTAL : <span>₹30</span>
          </p>
          <ToggleBtn />
        </div>
        <Button>order</Button>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    overflow: "auto",
  },
  order: {
    "& Button": {
      ...BTN_STYLE,
      width: 100,
      margin: 20,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 50,
  },
  total: {
    "& p": {
      "& span": {
        color: COLOR.GREEN,
      },
      color: COLOR.PRIMARY,
      fontWeight: "bold",
      margin: 10,
    },
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
