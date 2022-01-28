import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { NavLink, useNavigate, useParams } from "react-router-dom";

//-----------------------------------------------> custom component
import { InputBox, MiddleWare } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";

export default function SignIn() {
  const styles = useStyles();
  const [isEmail, setIsEmail] = useState(false);
  const navigate = useNavigate();
  const { cname } = useParams();
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
    // otp alert box if isEmail is false
    //save data to database

    navigate(`/${cname}/home`);
  };

  //-----------------------------------------------> Storing inputs
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------------------> onLcick google Btn
  const googleLogin = () => {
    // check for confirmation of google
    // autofill email input
    // alert set password for your gmail
    // save pasword and email to database
    // add a new use in db
    setIsEmail(!isEmail);
  };

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
          <Button onClick={googleLogin}>
            <img src="./google.png" alt="logo" height="30" />
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
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
      fontSize: 12,
      fontWeight: "bold",
      width: "100%",
      border: `2px solid ${COLOR.PRIMARY}`,
    },
    textAlign: "center",
  },
});
