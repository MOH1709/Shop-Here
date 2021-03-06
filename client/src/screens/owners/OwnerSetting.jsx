import axios from "axios";
import Cookies from "js-cookie";
import validator from "validator";
import { makeStyles, Button } from "@material-ui/core";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

//-----------------------------------------------> custom components
import { COLOR } from "../../constants";

export default function OwnerSetting() {
  const styles = useStyles();
  const navigate = useNavigate();

  //-----------------------------------------------> mailing link
  const mailLink = async () => {
    try {
      const email = prompt("enter email for sending link") || "";

      if (validator.isEmail(email) && email.split("@")[1] === "gmail.com") {
        const res = await axios.post("/utils/mail", {
          to: email,
          subject: "Welcome to Shop Here🤗",
          text: "https://shophereapp.herokuapp.com",
        });

        res.status === 200 && alert("link shared succesfully");
      } else {
        alert("gmail is invalid");
      }
    } catch (e) {
      alert("error in sending mail");
    }
  };

  //-----------------------------------------------> logout
  const logOut = async () => {
    try {
      const Cookiess = document.cookie.split("; ");
      const ux = Cookies.get("ux");
      if (ux) {
        await axios.delete(`/user/logout/${ux}`);
      }

      Cookiess.forEach((data) => {
        Cookies.remove(data.split("=")[0]);
      });
      navigate("/");
      window.location.reload();
    } catch (e) {
      alert("error in logging out");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Settings</p>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="./icons/backArrow.svg" alt="back" />
        </Button>
      </div>
      <div className={styles.main}>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/owner/setting/orders`}
        >
          My Orders
        </Button>
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/home`}
          onClick={() => {
            Cookies.remove("bx");
          }}
        >
          Switch As Consumer
        </Button>
        <Button className={styles.navBtn} onClick={mailLink}>
          share app
        </Button>
        {/* <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/owner/setting/updates`}
        >
          Update & Info
        </Button> */}
        {/* <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/setting/`}
        >
          Want A Product
        </Button> */}
        <Button
          className={styles.navBtn}
          component={NavLink}
          to={`/city/owner/setting/report`}
        >
          Report An Issue
        </Button>
        <Button className={styles.navBtn} onClick={logOut}>
          Log Out
        </Button>
        <Outlet />
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    backgroundColor: "white",
    zIndex: 20,
  },
  header: {
    "& p": {
      fontSize: 25,
      fontWeight: "bold",
    },
    "& Button": {
      borderRadius: 5,
      border: "2px solid white",
    },

    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    paddingRight: 10,
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.SECONDARY,
  },
  main: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    overflowY: "auto",
  },
  navBtn: {
    height: 50,
    borderRadius: 0,
    fontWeight: "bold",
    marginBlock: 5,
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
});
