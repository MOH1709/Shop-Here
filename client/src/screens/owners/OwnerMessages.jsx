import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom components
import { OwnerMessage } from "../../components/owner";
import { COLOR } from "../../constants";

export default function OwnerMessages() {
  const styles = useStyles();
  const [msg, setMsg] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getMessages = async () => {
      try {
        const bx = Cookies.get("bx");

        if (bx) {
          const { data } = await axios.get(`/bussiness/orders/${bx}`);

          isMounted && setMsg(data.orders.reverse() || []);
        }
      } catch (e) {
        alert("error in loading messages of owner");
      }
    };

    getMessages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        get your bill to safe side yourself from any issue :)
      </p>
      {msg.map((data) => (
        <OwnerMessage
          key={data._id}
          isUrgent={data.isUrgent}
          name={data.reciever.split("+").join(" ")}
          address={data.address}
          id={data._id}
          onConfirmPin={() => {
            setMsg(msg.filter((val) => val._id !== data._id).reverse());
          }}
        />
      ))}
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
