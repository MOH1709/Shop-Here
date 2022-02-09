import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { CartCard } from "../../components/user";
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import { Context } from "../../contexts/CartProvider";

export default function Cart() {
  const styles = useStyles();
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();
  const [urgent, setUrgent] = useState([]);
  const [address, setAddress] = useState(Cookies.get("fa") || "");
  const [total, setTotal] = useState(0);

  //----------------------------------------------->
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const compareShopId = (a, b) => {
        if (a.shopId < b.shopId) {
          return -1;
        }
        if (a.shopId > b.shopId) {
          return 1;
        }
        return 0;
      };

      setCart(cart.sort(compareShopId));

      setTotal(
        cart.reduce((pv, cv) => {
          return pv + parseInt(cv.price) * cv.quantity;
        }, 0)
      );
    }

    return () => {
      isMounted = false;
    };
  }, [cart, setCart]);

  //-----------------------------------------------> store text input
  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  //-----------------------------------------------> on order
  const order = () => {
    try {
      if (!address) {
        alert("please enter your full address, to deliver correctly");
        return;
      }

      const ux = Cookies.get("ux");
      if (!ux) {
        navigate(`/city/SignIn`);
        return;
      }

      let tempArr = [[]];
      cart.forEach((data, index) => {
        tempArr[tempArr.length - 1].push(data);

        if (cart[index].shopId !== cart[index + 1]?.shopId) {
          tempArr.push([]);
        }
      });

      tempArr.pop();
      tempArr.forEach(async (data) => {
        const res = await axios.post(`/order/${ux}`, {
          products: data.map((product) => {
            return {
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            };
          }),
          isUrgent: urgent.includes(cart[0].shopId),
          owner: data[0].address,
          ownerId: data[0].shopId,
          recievedAddress: address,
        });

        if (res.status === 200) {
          alert(
            `hurray, your order placed successfully to ${data[0].address} 🥳,
            will be delivered to you before ${
              urgent.includes(cart[0].shopId) ? "1 hour 🕐" : "10 P.M. 🕙"
            }`
          );
        } else {
          alert(
            `something wrong while placing order with ${data[0].address} ☹`
          );
        }

        setCart([]);
        setUrgent([]);
        navigate("/city/messages");
      });
    } catch (e) {
      alert("error in placing order");
    }
  };

  //-----------------------------------------------> returning component
  return (
    <div className={styles.container}>
      {cart.map((data, index) => {
        return (
          <div className={styles.shopCart} key={data._id}>
            <CartCard
              _id={data._id}
              price={data.price}
              q={data.quantity}
              shopName={data.address}
              name={data.name}
              img={data.img}
              avail={data.avail}
            />

            <ToggleBtn
              Style={{
                marginBlock: 20,
                display:
                  cart[index].shopId !== cart[index + 1]?.shopId &&
                  data.canUrgent
                    ? "flex"
                    : "none",
              }}
              title={"Urgent Order"}
              onClickHandler={(ic) => {
                if (ic === false) {
                  setUrgent([...urgent, data.shopId]);
                  alert(
                    `In urgent delivery product from this shop will be delivered before 1 hour 🕐 
                     with cost of only, 10₹ extra`
                  );
                } else {
                  setUrgent(urgent.filter((val) => val !== data.shopId));
                }
              }}
            />
          </div>
        );
      })}
      <div
        className={styles.order}
        style={{ display: cart.length ? "flex" : "none" }}
      >
        <InputBox
          title="Dilevery Address"
          value={address}
          Style={{ width: "80%", marginBlock: 30, marginInline: "auto" }}
          onChangeHandler={onChangeHandler}
        />
        <div className={styles.total}>
          <p className={styles.price}>
            TOTAL :
            <span style={{ marginInline: 5 }}>
              ₹{total} {urgent.length ? ` + ${urgent.length * 10}₹` : ""}
            </span>
          </p>
        </div>
        <Button onClick={order} className={styles.orderBtn}>
          {Cookies.get("ux") ? "" : "sign in to "} order
        </Button>
      </div>
      <div
        className={styles.emptyCart}
        style={{ display: cart.length ? "none" : "block" }}
      >
        <img src="./emptyCart.png" alt="img" />
        {/* <p>Empty Cart</p> */}
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
  shopCart: {
    width: "80%",
    marginBlock: 30,
    marginInline: "auto",
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
  order: {
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
  orderBtn: {
    ...BTN_STYLE,
    width: "80%",
    height: 40,
    marginTop: 30,
    margin: 20,
  },
  emptyCart: {
    "& img": {
      marginTop: 50,
      width: "100%",
    },
    "& p": {
      fontSize: 20,
      color: COLOR.PRIMARY,
      fontWeight: "bold",
    },
    overflow: "hidden",
    textAlign: "center",
    marginBlock: "auto",
  },
});
