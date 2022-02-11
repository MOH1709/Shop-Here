import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

import { BTN_STYLE, SHADOW } from "../../constants";

export default function ReportBug() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  //-----------------------------------------------> on click send
  const sendIssue = async () => {
    try {
      const ux = Cookies.get("ux");

      if (text) {
        await axios.post(`/user/issue/${ux}`, {
          message: text,
        });
        alert("issue reported succesfully");
      }

      navigate("/city/home");
    } catch (e) {
      alert("error in sending issue");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Facing any issue ⛔</p>
      <p className={styles.title}>please let us know 😊</p>
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        className={styles.isuueInput}
        cols="30"
        rows="10"
      ></textarea>
      <Button onClick={sendIssue} className={styles.btn}>
        send
      </Button>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    width: "100%",
    height: "100%",
    minHeight: 400,
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  isuueInput: {
    outline: "none",
    border: "none",
    minWidth: "100%",
    maxWidth: "100%",
    padding: 10,
    marginTop: 20,
    fontSize: 15,
    marginBottom: 30,
    borderRadius: 3,
    boxShadow: SHADOW,
  },
  btn: {
    ...BTN_STYLE,
    marginInline: "auto",
    width: "100%",
    height: 40,
  },
});
