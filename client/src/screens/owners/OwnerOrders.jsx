import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";

import { OwnerOrderCard } from "../../components/owner";

export default function OwnerOrders() {
  const styles = useStyles();
  const [orders, setOrders] = useState([]);

  //-----------------------------------------------> load orders
  useEffect(() => {
    let isMounted = true;

    const getOrders = async () => {
      try {
        const bx = Cookies.get("bx");
        const { data } = await axios.get(`/order/shop/${bx}`);

        isMounted && setOrders(data || []);
      } catch (e) {
        console.log(e);
      }
    };
    getOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      {orders.map((data) => (
        <OwnerOrderCard
          key={data._id}
          id={data._id}
          name={data.recievedTime}
          address={data.recievedAddress}
          isDelivered={data.isSucessful}
        />
      ))}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    overflow: "auto",
  },
});
