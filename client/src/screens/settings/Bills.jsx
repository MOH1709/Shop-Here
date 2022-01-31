import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

//-----------------------------------------------> custom components
import { Card } from "../../components";

export default function Bills() {
  const styles = useStyles();
  const [order, setOrders] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getOrders = async () => {
      try {
        const res = await axios.get(`/${Cookies.get("ux")}/orders`);
        isMounted && setOrders(res.data);
      } catch (e) {
        alert("error in bills");
      }
    };

    getOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  //-----------------------------------------------> on click
  const showDetails = async (id) => {
    try {
      const res = await axios.get(`/${id}/orderdetails`);
      console.log(res.data);
    } catch (e) {
      alert("error in product details");
    }
  };

  return (
    <div className={styles.container}>
      {order.map((data) => (
        <Card
          key={data._id}
          title={"From"}
          content={data.owner}
          onClickHandler={() => {
            showDetails(data.orderId);
          }}
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
    minHeight: 400,
    padding: 15,
    backgroundColor: "white",
  },
});
