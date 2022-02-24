import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { ConsumerMessage, OnSwipe } from "../../components";
import { COLOR } from "../../constants";

export default function Messages() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [msg, setMsg] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getMessages = async () => {
      try {
        const ux = Cookies.get("ux");

        if (ux) {
          const res = await axios.get(`/user/orders/${ux}`);
          isMounted && setMsg(res.data);
        }
      } catch (e) {
        alert("error in loading messages");
      }
    };

    getMessages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <OnSwipe
        onSwipeRight={() => {
          navigate("/city/home");
        }}
        onSwipeLeft={() => {
          navigate("/city/cart");
        }}
      />
      <p className={styles.title}>
        Share the Code generated from order with Shop Owner's, To Confirm Your
        Order & recievr Bill :)
      </p>
      {msg
        .map((data) => (
          <ConsumerMessage
            key={data._id}
            onClickHandler={() => {
              navigate(`/city/messages/${data._id}`);
            }}
            pin={data.orderPin}
            owners={[data.owner]}
          />
        ))
        .reverse()}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
  },
  title: {
    padding: 10,
    fontSize: 12,
    textAlign: "center",
    backgroundColor: COLOR.GREEN,
    color: "white",
  },
});
