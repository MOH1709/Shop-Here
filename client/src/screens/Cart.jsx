import { makeStyles } from "@material-ui/core";
import { useState } from "react";

import { CartCard, InputBox } from "../components";

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
          title="Total Prize"
          Style={{ width: "80%" }}
          name="total"
          onChangeHandler={onChangeHandler}
        />
        <InputBox
          title="Full Address"
          name="address"
          Style={{ width: "80%", marginBlock: 30 }}
          onChangeHandler={onChangeHandler}
        />
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
});
