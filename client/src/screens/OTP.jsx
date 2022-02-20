import { makeStyles, Button } from "@material-ui/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import { SHADOW, BTN_STYLE } from "../constants";
import { useEffect } from "react";

export default function OTP() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [state, navigate]);

  //-----------------------------------------------> check otp
  const checkOtp = async () => {
    try {
      const userId = state.data.userId;

      const res = await axios.get(`/otp/${userId}/${otp}`);

      if (userId && res.data.isMatch) {
        if (state.user === "save") {
          await axios.post(`/user/signin`, {
            cid: Cookies.get("ci"),
            aid: Cookies.get("ai"),
            name: Cookies.get("un"),
            userId,
            password: state.data.password,
            address: Cookies.get("fa"),
          });
        }

        await axios.delete(`/otp/${userId}`);
        navigate(-2);
      } else {
        alert("Wrong Otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container}>
      <h2>ENTER OTP</h2>
      <input
        type="number"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        autoFocus={true}
        placeholder="Enter otp here..."
        className={styles.input}
      />
      <Button className={styles.btn} onClick={checkOtp}>
        confirm
      </Button>
    </form>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    margin: "auto",
    height: "50%",
    width: "90%",
    maxWidth: 600,
    boxShadow: SHADOW,
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: 40,
    paddingInline: 10,
    border: "none",
    outline: "none",
    boxShadow: SHADOW,
    borderRadius: 5,
  },
  btn: {
    ...BTN_STYLE,
    width: "90%",
    height: 40,
  },
});
