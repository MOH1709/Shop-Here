import axios from "../utils/axios";
import Cookies from "js-cookie";
import validator from "validator";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom component
import { InputBox, MiddleWare } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";

export default function SignIn() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
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
    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> onClick Signin
  const signIn = async (e) => {
    try {
      // check if both field are filled
      if (!(input.email || input.password)) {
        alert("please fill all field");
        return;
      }

      if (!validator.isEmail(input.email)) {
        alert("fill correct email id");
        return;
      }

      if (input.password.length < 8) {
        alert("password should be minimum 8 character long");
        return;
      }

      const userId = input.email.split("@")[0];
      const { status } = await axios.post(`/otp`, {
        userId,
      });

      if (status === 200) {
        navigate("/otp", {
          state: {
            user: "save",
            data: {
              userId,
              password: input.password,
            },
          },
        });
      } else {
        alert("no such gmail exists");
      }
    } catch (e) {
      console.log(e);

      // alert("error in signing in");
      // window.location.reload();
    }
  };

  //-----------------------------------------------> onLcick google Btn
  const onLoginSuccess = async (e) => {
    try {
      let password = "";
      do {
        password = prompt("Enter a new 8 digit password");
      } while (password.length < 8);

      await axios.post(`/user/signin`, {
        cid: Cookies.get("ci"),
        aid: Cookies.get("ai"),
        name: Cookies.get("un"),
        userId: e.profileObj.email.split("@")[0],
        password,
        address: Cookies.get("fa"),
      });

      navigate(-1);
    } catch (error) {
      alert("account already exist");
    }
  };

  //-----------------------------------------------> return component
  return (
    <div className={styles.container}>
      <MiddleWare />

      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Shop Here</p>
      </div>
      <p className={styles.title}>Sign In</p>
      <p className={styles.link}>
        already have an account ?<NavLink to="/login">Log In</NavLink>
      </p>
      <form className={styles.form}>
        <InputBox
          title={"Email Id"}
          value={input.email}
          onChangeHandler={onChangeHandler}
          name="email"
        />
        <InputBox
          title={"New Password"}
          onChangeHandler={onChangeHandler}
          name="password"
          type="password"
          value={input.password}
        />

        <Button className={styles.create} onClick={signIn}>
          get otp
        </Button>
        <div className={styles.api}>
          <p> OR </p>
          <GoogleLogin
            className={styles.create}
            clientId={process.env.REACT_APP_CLIENTID}
            onSuccess={onLoginSuccess}
            cookiePolicy={"single_host_origin"}
          />
        </div>
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

  create: {
    ...BTN_STYLE,
    cursor: "pointer",
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
