import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [data, setData] = useState({
    fName: "",
    lName: "",
    city: "Halol",
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const selectOption = (e) => {
    setData({
      ...data,
      city: e.target.outerText,
    });

    setShowOption(false);
  };

  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="60" />
        <p>Clean City</p>
      </div>
      <div className={styles.form}>
        <InputBox
          title={"First Name"}
          onChangeHandler={onChangeHandler}
          name="fname"
        />
        <InputBox
          title={"Last Name"}
          onChangeHandler={onChangeHandler}
          name="lname"
        />
        <div className={styles.cityDiv}>
          <p>City</p>
          <Button
            name="city"
            className={styles.dropBox}
            onClick={() => {
              setShowOption(!showOption);
            }}
          >
            {data.city}
            <img src="./icons/drop.svg" alt=">" />
          </Button>
          <div className={styles.options}>
            <Button
              onClick={selectOption}
              style={{ display: showOption ? "flex" : "none" }}
            >
              Halol
            </Button>
          </div>
        </div>
        <Button
          className={styles.start}
          onClick={() => {
            navigate("/halol/home");
          }}
        >
          start
        </Button>
      </div>
    </form>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    maxWidth: 600,
    marginInline: "auto",
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
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  cityDiv: {
    "& p": {
      width: 100,
      padding: 10,
      textAlign: "center",
      fontWeight: "bold",
      color: COLOR.PRIMARY,
      border: `2px solid ${COLOR.PRIMARY}`,
      borderRadius: 5,
    },
    position: "relative",

    display: "flex",
    borderRadius: 5,
    borderRight: "none",
  },
  dropBox: {
    ...BTN_STYLE,
    flex: 1,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  options: {
    "& Button": {
      color: COLOR.PRIMARY,
      width: "90%",
      marginInline: "auto",
      borderBottom: "2px solid rgba(0,0,0,0.5)",
      borderLeft: "none",
    },
    zIndex: 2,
    maxHeight: 200,
    overflowY: "auto",
    position: "absolute",
    left: 100,
    top: 45,
    borderRadius: 5,
    width: "calc(100% - 100px)",
    backgroundColor: "white",
    border: "2px solid rgba(0,0,0,0.5)",
  },
  start: {
    ...BTN_STYLE,
    width: 150,
    padding: 10,
    marginInline: "auto",
  },
});
