import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom component
import { InputBox, MiddleWare } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";

export default function SignIn() {
  const styles = useStyles();
  const navigate = useNavigate();
  // const [isEmail, setIsEmail] = useState(false);
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    // check if user already signed in or not
    if (Cookies.get("ux")) {
      navigate(-1);
    }
  }, [navigate]);

  //-----------------------------------------------> set inputs
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    // deduce restriction for valid phone number
    if (name === "phoneNumber" && value.length > 10) {
      return;
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> onClick Signin
  const signIn = async () => {
    try {
      // check if both field are filled
      if (!(input.phoneNumber || input.password)) {
        alert("please fill all field");
        return;
      }

      if (input.password.length < 8) {
        alert("password should be minimum 8 character long");
        return;
      }

      await axios.post(`/user/signin`, {
        cid: Cookies.get("ci"),
        aid: Cookies.get("ai"),
        name: Cookies.get("un"),
        userId: input.phoneNumber,
        password: input.password,
        address: Cookies.get("fa"),
      });

      navigate(-1);
    } catch (e) {
      alert("account already exist");
    }
  };

  //-----------------------------------------------> onLcick google Btn
  // const googleLogin = () => {
  //   // check for confirmation of google
  //   // autofill email input
  //   // alert set password for your gmail
  //   // save pasword and email to database
  //   // add a new use in db
  //   setIsEmail(!isEmail);
  // };

  //-----------------------------------------------> return component
  return (
    <div className={styles.container}>
      <MiddleWare />
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Clean City</p>
      </div>
      <p className={styles.title}>Sign In</p>
      <p className={styles.link}>
        already have an account ?<NavLink to="/login">Log In</NavLink>
      </p>
      <form className={styles.form}>
        <InputBox
          title={"Email ID"}
          type={"text"}
          value={input.phoneNumber}
          onChangeHandler={onChangeHandler}
          name="phoneNumber"
        />
        <InputBox
          title={"New Password"}
          onChangeHandler={onChangeHandler}
          name="password"
          type="password"
          value={input.password}
        />
        <Button className={styles.create} onClick={signIn}>
          create
        </Button>
        {/* <div className={styles.api}>
          <p> OR </p>
          <Button onClick={googleLogin}>
            <img src="./google.png" alt="logo" height="30" />
            Sign In with Google
          </Button>
        </div> */}
      </form>
    </div>
  );
}

//-----------------------------------------------> Custom styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    maxWidth: 600,
    maxHeight: 750,
    height: "100%",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.5)",
  },
  logoDiv: {
    "& img": {
      marginInline: 10,
    },
    ...FLEX_CENTER,
    fontWeight: "bold",
    color: COLOR.SECONDARY,
  },
  title: {
    marginTop: 40,
    color: COLOR.PRIMARY,
    fontSize: 25,
    fontWeight: "bold",
  },
  link: {
    "& :first-child": {
      marginLeft: 10,
      color: COLOR.PRIMARY,
      fontWeight: "bold",
    },
    fontSize: 12,
    color: COLOR.PRIMARY,
  },
  form: {
    minHeight: 400,

    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  create: {
    ...BTN_STYLE,
    width: "100%",
    color: "white",
    padding: 10,
    marginInline: "auto",
  },
  api: {
    "& p": {
      fontWeight: "bold",
      marginBottom: 10,
    },
    "& Button": {
      "& img": {
        marginInline: 10,
      },
      color: COLOR.PRIMARY,
      fontSize: 12,
      fontWeight: "bold",
      width: "100%",
      border: `2px solid ${COLOR.PRIMARY}`,
    },
    textAlign: "center",
  },
});
