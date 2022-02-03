import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom Componenets
import { BTN_STYLE, COLOR } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerMessage({ name, address, id }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [pin, setPin] = useState(0);

  //-----------------------------------------------> congirm password
  const confirmPin = async () => {
    try {
      const res = await axios.get(`/${id}/checkorderpin`);

      if (res.data.orderPin === parseInt(pin)) {
        await axios.put(`/${id}/${Cookies.get("bx")}/orderDilivered`);

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
          navigate(`/city/messages/${id}`);
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
    backgroundColor: COLOR.PRIMARY,
  },
  name: {
    "& span": {
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    paddingLeft: 10,
  },
  address: {
    "& span": {
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
    },
    paddingLeft: 10,
    overflow: "hidden",
  },
  inputDiv: {
    "& Button": {
      ...BTN_STYLE,
      fontSize: 12,
      color: COLOR.PRIMARY,
      backgroundColor: COLOR.SECONDARY,
    },
    "& input": {
      flex: 1,
      minWidth: 10,
      paddingInline: 10,
      border: "none",
      outline: "none",
      borderRadius: 3,
    },
    display: "flex",
    marginBlock: 20,
  },
  btn: {
    color: COLOR.SECONDARY,
    marginTop: 10,
    padding: 5,
    fontSize: 12,
    width: "100%",
    border: `2px solid ${COLOR.SECONDARY}`,
  },
});
