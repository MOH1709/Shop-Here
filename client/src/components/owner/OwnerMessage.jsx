import axios from "../../utils/axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR, SHADOW } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerMessage({ name, address, id, isUrgent }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [pin, setPin] = useState(0);

  //-----------------------------------------------> congirm password
  const confirmPin = async () => {
    try {
      const res = await axios.get(`/order/checkorderpin/${id}`);

      if (res.data.orderPin === parseInt(pin)) {
        await axios.put(`/order/setorderDelivered/${id}/${Cookies.get("bx")}`);

        alert("dilivered succesfully 🥳");
        window.location.reload();
      } else {
        alert("Wrong pin");
      }
    } catch (e) {
      alert("error in confirming password");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.name}>
        Name : <span>{name}</span>
      </p>
      <p className={styles.address}>
        Address : <span>{address}</span>
      </p>
      <p className={styles.isUrgent}>{isUrgent ? "Urgent Order 🕐" : ""}</p>
      <div className={styles.inputDiv}>
        <input
          type="number"
          onChange={(e) => {
            setPin(e.target.value);
          }}
          placeholder="Enter Code"
        />
        <Button onClick={confirmPin}>confirm</Button>
      </div>
      <Button
        className={styles.btn}
        onClick={() => {
          navigate(`/city/owner/messages/${id}`);
        }}
      >
        click to show more
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    margin: 10,
    color: "white",
    padding: 10,
    flexDirection: "column",
    cursor: "pointer",
    marginBlock: 10,
    borderRadius: 5,
    boxShadow: SHADOW,
    backgroundColor: "white",
  },
  name: {
    "& span": {
      fontWeight: "bold",
      color: COLOR.PRIMARY,
    },
    paddingLeft: 10,
    color: COLOR.PRIMARY,
  },
  address: {
    "& span": {
      fontSize: 12,
      color: COLOR.PRIMARY,
      opacity: 0.4,
    },
    color: COLOR.PRIMARY,

    paddingLeft: 10,
    overflow: "hidden",
  },
  isUrgent: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: COLOR.SECONDARY,
  },
  inputDiv: {
    "& Button": {
      ...BTN_STYLE,
      fontSize: 12,
    },
    "& input": {
      flex: 1,
      minWidth: 10,
      paddingInline: 10,
      outline: "none",
      borderRadius: 3,
      border: `2px solid ${COLOR.PRIMARY}`,
    },
    display: "flex",
    marginBlock: 20,
  },
  btn: {
    ...BTN_STYLE,
    marginTop: 10,
    padding: 5,
    height: 40,
    fontSize: 12,
    width: "100%",
  },
});
