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
  const [isUrgent, setIsUrgent] = useState(false);
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

  //----------------------------------------------->
  useEffect(() => {}, [cart]);

  //-----------------------------------------------> store text input
  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  //-----------------------------------------------> is urgent Available
  const checkIsUrgentAvail = async (id) => {
    try {
      const res = await axios.get(`/${id}/isurgentavail`);
      setIsUrgent(res.data);
    } catch (e) {
      alert("error in checking urgetn status");
    }
  };

  //-----------------------------------------------> on order
  const order = () => {
    try {
      if (!address) {
        alert("please enter your full address, to deliver correctly");
        return;
      }

      if (isUrgent) {
        setTotal(total + 10);
      }
      Cookies.set("fa", address);

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
        const res = await axios.post(`/${ux}/orders`, {
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
            `hurray, your order placed successfully to ${data[0].address} 🥳 `
          );
        } else {
          alert(
            `something wrong while placing order with ${data[0].address} ☹`
          );
        }

        setCart([]);
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
        if (cart[index].shopId !== cart[index + 1]?.shopId) {
          checkIsUrgentAvail(data.shopId);
        }
        return (
          <div className={styles.shopCart} key={data._id}>
            <CartCard
              _id={data._id}
              price={data.price}
              q={data.quantity}
              shopName={data.address}
              name={data.name}
              img={data.img}
            />

            <ToggleBtn
              Style={{
                width: 180,
                marginBlock: 20,
                display:
                  cart[index].shopId !== cart[index + 1]?.shopId && isUrgent
                    ? "flex"
                    : "none",
              }}
              title={"Urgent"}
              onClickHandler={(ic) => {
                if (ic === false) {
                  setUrgent([...urgent, data.shopId]);
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
            TOTAL :<span style={{ marginInline: 5 }}> ₹{total} </span>
            <span style={{ display: isUrgent ? "block" : "none" }}></span>
          </p>
        </div>
        <Button onClick={order} className={styles.orderBtn}>
          {Cookies.get("ux") ? "" : "sign in to "} order
        </Button>
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
});
