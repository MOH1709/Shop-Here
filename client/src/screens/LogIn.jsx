import axios from "axios";
import validator from "validator";

import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom Components
import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";

export default function LogIn() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //-----------------------------------------------> set inputs
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
      const { email, password } = input;

      // check if both inputs are filled
      if (email && password) {
        // check custom validation of mobile number
        if (!validator.isEmail(email)) {
          alert("please, enter a valid email address :)");
          return;
        }

        // getting data of user from backend
        const res = await axios.put(`/user/login`, {
          userId: email.split("@")[0],
          password,
        });

        // checking user authentication
        if (res.status === 200) {
          navigate(`/city/home/areas`);
        } else {
          alert("Incorrect Id or password");
        }
      } else {
        alert("please fill all input field");
      }
    } catch (e) {
      alert("invalid credintials");
      setInput({
        email: "",
        password: "",
      });
    }
  };

  //-----------------------------------------------> return component
  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Shop Here</p>
      </div>
      <p className={styles.title}>Log In</p>
      <p className={styles.link}>
        Don't have an account ?<NavLink to="/city/signin">Create</NavLink>
      </p>
      <div className={styles.form}>
        <InputBox
          title={"Email Id"}
          autoFocus={true}
          onChangeHandler={onChangeHandler}
          name="email"
          value={input.email}
        />
        <div>
          <InputBox
            title={"Password"}
            onChangeHandler={onChangeHandler}
            name="password"
            type="password"
            value={input.password}
          />
          <NavLink className={styles.fp} to="/otp">
            forgot password ?
          </NavLink>
        </div>
        <Button onClick={login} className={styles.login}>
          Log in
        </Button>
      </div>
    </form>
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
    flexDirection: "column",
    fontWeight: "bold",
    color: COLOR.PRIMARY,
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
      color: COLOR.SECONDARY,
      fontWeight: "bold",
    },
    fontSize: 12,
    color: COLOR.SECONDARY,
  },
  form: {
    minHeight: 400,

    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  fp: {
    float: "right",
    marginTop: 10,
    letterSpacing: -0.3,
    fontSize: 15,
    textDecoration: "none",
    color: COLOR.PRIMARY,
  },
  login: {
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
    textAlign: "center",
  },
});
