import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom Components
import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });

  //-----------------------------------------------> store inputs
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> onClick login
  const login = async () => {
    try {
      const { phoneNumber, password } = input;

      if (phoneNumber && password) {
        if (phoneNumber.length < 10) {
          alert("please, enter a valid phone number :)");
          return;
        }

        const res = await axios.get(`/login/${phoneNumber}/${password}`);

        if (res.status === 200) {
          navigate(`/city/home/areas`);
        } else {
          alert("Wrong data or password");
        }

        setInput({
          phoneNumber: "",
          password: "",
        });
      } else {
        alert("please fill all input field");
      }
    } catch (e) {
      alert("Wrong Inputs");
      setInput({
        phoneNumber: "",
        password: "",
      });
    }
  };

  //-----------------------------------------------> return component
  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Clean City</p>
      </div>
      <p className={styles.title}>Log In</p>
      <p className={styles.link}>
        Don't have an account ?<NavLink to="/city/signin">Create</NavLink>
      </p>
      <div className={styles.form}>
        <InputBox
          title={"Mobile Number"}
          onChangeHandler={onChangeHandler}
          name="phoneNumber"
          value={input.phoneNumber}
          type={"number"}
        />
        <InputBox
          title={"Password"}
          onChangeHandler={onChangeHandler}
          name="password"
          type="password"
          value={input.password}
        />
        <Button onClick={login} className={styles.login}>
          Log in
        </Button>
      </div>
    </form>
  );
}

//-----------------------------------------------> Styles
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

  login: {
    ...BTN_STYLE,
    width: "100%",
    color: "white",
    padding: 10,
    marginInline: "auto",
  },
});
