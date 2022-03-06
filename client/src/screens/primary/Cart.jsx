import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { CartCard } from "../../components/user";
import { InputBox, LoadingDisplay, OnSwipe, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import { Context } from "../../contexts/CartProvider";

export default function Cart() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cart, setCart } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [MOV, setMOV] = useState({});
  const [urgent, setUrgent] = useState([]);
  const [address, setAddress] = useState(Cookies.get("fa") || "");
  const [total, setTotal] = useState(0);

  //----------------------------------------------->
  useEffect(() => {
    let isMounted = true;

    const compareShopId = (a, b) => {
      if (a.shopId < b.shopId) {
        return -1;
      }
      if (a.shopId > b.shopId) {
        return 1;
      }
      return 0;
    };

    if (isMounted) {
      setCart(cart.sort(compareShopId));

      let obj = {};
      cart.forEach((data) => {
        obj[data.shopId] = {
          st: obj[data.shopId]?.st
            ? obj[data.shopId].st + data.price * data.quantity
            : data.price * data.quantity,
          mov: data.MOV,
          shop: data.address,
        };
      });
      setMOV(obj);

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

      for (let data in MOV) {
        if (MOV[data].st < MOV[data].mov) {
          alert(`please match "minimun order value" of ${MOV[data].shop} to place order,
           or remove all product of this shop❌`);
          return;
        }
      }

      setIsLoading(true);
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
              _id: product._id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            };
          }),
          isUrgent: urgent.includes(data[0].shopId),
          owner: data[0].address,
          ownerId: data[0].shopId,
          recievedAddress: address,
        });

        if (res.status === 200) {
          setIsLoading(false);
          alert(
            `hurray, your order placed successfully to ${data[0].address} 🥳,
            will be delivered to you before ${
              urgent.includes(data[0].shopId) ? "1 hour 🕐" : "10 P.M. 🕙"
            }`
          );
        } else {
          setIsLoading(false);
          alert(
            `something wrong while placing order with ${data[0].address} ☹`
          );
        }

        setMOV({});
        setCart([]);
        setUrgent([]);
        navigate("/city/messages");
      });
    } catch (e) {
      setIsLoading(false);
      alert(e);
    }
  };

  //-----------------------------------------------> Toggle fast
  const toggleFastDilevery = (isClicked, data) => {
    if (isClicked === false) {
      setUrgent([...urgent, data.shopId]);
      alert(
        `In Fast delivery, your Order from ${data.address} will be delivered before 1 hour 🕐😳`
      );
    } else {
      setUrgent(urgent.filter((val) => val !== data.shopId));
    }
  };

  //-----------------------------------------------> returning component
  return (
    <div className={styles.container}>
      <LoadingDisplay isLoading={isLoading} />
      {pathname === "/city/cart" && (
        <OnSwipe
          onSwipeRight={() => {
            navigate("/city/home");
          }}
        />
      )}
      {cart.map((data, index) => {
        return (
          <div className={styles.shopCart} key={data._id}>
            <CartCard state={data} />

            <div
              className={styles.seperator}
              style={{
                display:
                  cart[index].shopId !== cart[index + 1]?.shopId
                    ? "block"
                    : "none",
              }}
            >
              <ToggleBtn
                Style={{
                  marginBlock: 20,
                  display: data.canUrgent ? "flex" : "none",
                }}
                title={"Fast Delivery"}
                onClickHandler={(isClicked) => {
                  toggleFastDilevery(isClicked, data);
                }}
              />
              <p className={styles.seperatorP}>
                Sub Total :
                <span>
                  {" ₹"}
                  {MOV[data.shopId]?.st}
                </span>
              </p>
              <p className={styles.seperatorP}>
                minimum order value : <span>{data.MOV} ₹</span>
              </p>
            </div>
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
            TOTAL :<span style={{ marginInline: 5 }}>₹{total}</span>
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
  seperator: {
    borderBottom: `7px solid ${COLOR.PRIMARY}`,
  },
  seperatorP: {
    "& span": {
      color: COLOR.GREEN,
      fontWeight: "bold",
    },
    lineHeight: 1.2,
    color: COLOR.PRIMARY,
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
