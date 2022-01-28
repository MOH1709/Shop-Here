import { makeStyles, Button } from "@material-ui/core";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { CartCard, InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import { Context } from "../../contexts/CartProvider";

export default function Cart() {
  const styles = useStyles();
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();
  const { cname } = useParams();
  const [isUrgent, setIsUrgent] = useState(false);
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

  const order = () => {
    // navigate(`/${cname}/home`);
    navigate(`/SignIn`);
  };

  return (
    <div className={styles.container}>
      {cart.map((data, i) => (
        <CartCard
          key={i}
          price={data.price}
          q="1"
          shopName="Mahavir general store, sb nagar pavagadh road halol"
          name={data.name}
          img={data.img}
        />
      ))}
      <div className={styles.order} style={{ display: "none" }}>
        <InputBox
          title="Full Address"
          name="address"
          Style={{ width: "80%", marginBlock: 30, marginInline: "auto" }}
          onChangeHandler={onChangeHandler}
        />
        <div className={styles.total}>
          <p className={styles.price}>
            TOTAL :<span style={{ marginInline: 5 }}> ₹30 </span>
            <span style={{ display: isUrgent ? "block" : "none" }}> + ₹10</span>
          </p>
          <ToggleBtn onClickHandler={() => setIsUrgent(!isUrgent)} />
        </div>
        <Button onClick={order}>order</Button>
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
      width: "80%",
      height: 40,
      marginTop: 30,
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
    },
    whiteSpace: "nowrap",

    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    marginInline: 30,
    marginBlock: 20,
    display: "flex",
  },
});
