import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

//-----------------------------------------------> custom component
import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState({
    phoneNumber: "",
    password: "",
  });

  //-----------------------------------------------> onClick Signin
  const signIn = () => {
    if (!(data.phoneNumber || data.password)) {
      alert("please fill all field");
      return;
    }

    //get data from cookies
    //save data to database

    navigate(`/{none}/home`);
  };

  //-----------------------------------------------> Storing inputs
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------------------> return component
  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Clean City</p>
      </div>
      <p className={styles.title}>Sign In</p>
      <p className={styles.link}>
        already have an account ?<NavLink to="/login">Log In</NavLink>
      </p>
      <div className={styles.form}>
        <InputBox
          title={"Mobile Number"}
          onChangeHandler={onChangeHandler}
          name="phoneNumber"
        />
        <InputBox
          title={"New Password"}
          onChangeHandler={onChangeHandler}
          name="password"
          type="password"
        />
        <Button className={styles.create} onClick={signIn}>
          create
        </Button>
        <div className={styles.api}>
          <p> OR </p>
          <Button>
            <img src="./google.png" alt="logo" height="30" />
            Sign In with Google
          </Button>
        </div>
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
      width: "100%",
      border: `2px solid ${COLOR.PRIMARY}`,
    },
    textAlign: "center",
  },
});
