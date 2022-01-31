import axios from "axios";
import cookie from "js-cookie";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//-----------------------------------------------> custom components
import { InputBox } from "../../components";
import { BTN_STYLE, SHADOW } from "../../constants";

export default function Profile() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    fa: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    const ux = cookie.get("ux");

    if (!ux) {
      navigate(`/city/signin`);
      return;
    }

    try {
      const fullname = cookie.get("un").split("+");

      setData({
        fname: fullname[0],
        lname: fullname[1],
        fa: cookie.get("fa") || "",
      });
    } catch (e) {
      alert("error in obtaining profile data of user");
    }
  }, [navigate]);

  //-----------------------------------------------> on change input
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------------------> on change area
  const selectArea = () => {
    cookie.remove("ai");
    navigate("/city/home/areas");
  };

  //-----------------------------------------------> on change name or address
  const updateUserDetails = async () => {
    try {
      const { fname, lname, fa } = data;

      const res = await axios.put(`/${cookie.get("ux")}/updateUser`, {
        state: {
          name: `${fname}+${lname}`,
          address: fa || "",
        },
      });

      if (res.status === 200) {
        cookie.set("un", `${fname}+${lname}`);
        cookie.set("fa", fa);
        alert("updated successfully :)");
        navigate("/city/home");
      }
    } catch (e) {
      alert("error in updating profile");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameDiv}>
        <InputBox
          Style={{ marginBlock: 20 }}
          name="fname"
          value={data.fname}
          title={"First Name"}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          name="lname"
          value={data.lname}
          title={"Last Name"}
          onChangeHandler={changeHandler}
        />

        <InputBox
          Style={{ marginBlock: 20 }}
          name="fa"
          value={data.fa}
          title={"Dilivery Address"}
          onChangeHandler={changeHandler}
        />

        <Button onClick={updateUserDetails}>update</Button>
      </div>
      <Button onClick={selectArea}>change area</Button>
      {/* <Button>change city</Button> */}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    "& Button": {
      ...BTN_STYLE,
      width: "90%",
      marginInline: "auto",
      marginBlock: 20,
    },
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
});
