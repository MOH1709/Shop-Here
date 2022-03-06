import axios from "axios";
import Cookies from "js-cookie";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { InputBox } from "../../components";
import { BTN_STYLE, SHADOW } from "../../constants";

export default function Profile() {
  const styles = useStyles();
  const navigate = useNavigate();
  const ux = Cookies.get("ux");
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    fa: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    try {
      const fullname = Cookies.get("un").split("+");

      setInput({
        fname: fullname[0],
        lname: fullname[1],
        fa: Cookies.get("fa") || "",
      });
    } catch (e) {
      alert("error in obtaining profile data of user");
    }
  }, [navigate]);

  //-----------------------------------------------> on change input
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> on change name or address
  const updateUserDetails = async () => {
    try {
      const { fname, lname, fa } = input;

      const res = await axios.put(`/user/${Cookies.get("ux")}`, {
        state: {
          name: `${fname}+${lname}`,
          address: fa || "",
        },
      });

      if (res.status === 200) {
        Cookies.set("un", `${fname}+${lname}`, { expires: 30 });
        Cookies.set("fa", fa, { expires: 30 });
        alert("updated successfully :)");
        navigate("/city/home");
      }
    } catch (e) {
      alert("error in updating profile");
    }
  };

  return ux ? (
    <div className={styles.container}>
      <div className={styles.nameDiv}>
        <InputBox
          Style={{ marginBlock: 20 }}
          name="fname"
          value={input.fname}
          title={"First Name"}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          name="lname"
          value={input.lname}
          title={"Last Name"}
          onChangeHandler={changeHandler}
        />

        <InputBox
          Style={{ marginBlock: 20 }}
          name="fa"
          value={input.fa}
          title={"Delivery Address"}
          onChangeHandler={changeHandler}
        />

        <Button className={styles.btn} onClick={updateUserDetails}>
          update
        </Button>
      </div>
    </div>
  ) : (
    <Navigate to="/city/signin" />
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    minHeight: 400,
    padding: 15,
    backgroundColor: "white",
  },
  nameDiv: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    boxShadow: SHADOW,
  },
  btn: {
    ...BTN_STYLE,
    width: "90%",
    marginInline: "auto",
    marginBlock: 20,
  },
});
