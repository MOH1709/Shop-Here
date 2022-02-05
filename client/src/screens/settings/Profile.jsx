import axios from "axios";
import Cookies from "js-cookie";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { InputBox, ToggleBtn } from "../../components";
import { BTN_STYLE, SHADOW } from "../../constants";

export default function Profile() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [saveMsg, setSaveMsg] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    fa: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    const ux = Cookies.get("ux");

    if (!ux) {
      navigate(`/city/signin`);
      return;
    }

    try {
      const fullname = Cookies.get("un").split("+");

      setData({
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

    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------------------> on change name or address
  const updateUserDetails = async () => {
    try {
      const { fname, lname, fa } = data;

      const res = await axios.put(`/${Cookies.get("ux")}/updateUser`, {
        state: {
          name: `${fname}+${lname}`,
          address: fa || "",
          saveMsg,
        },
      });

      if (res.status === 200) {
        Cookies.set("un", `${fname}+${lname}`);
        Cookies.set("fa", fa);
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

        <ToggleBtn
          title={"save messages"}
          initialState={saveMsg}
          onClickHandler={() => {
            setSaveMsg(!saveMsg);
          }}
          Style={{
            width: 170,
            marginInline: "auto",
            marginBlock: 30,
            borderBottom: "none",
          }}
        />

        <Button onClick={updateUserDetails}>update</Button>
      </div>
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
