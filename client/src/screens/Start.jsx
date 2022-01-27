import { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";

//-----------------------------------------------> Custom Components
import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";
import { useNavigate, NavLink } from "react-router-dom";

export default function Start() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    city: "halol",
    cname: "389350",
  });
  const [cities, setCities] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    fetch("/cities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //-----------------------------------------------> edit this
        setCities([{ id: "389350", name: "halol" }]);
      })
      .catch((e) => {
        alert("error in obtaining cities");
      });
  }, []);
  //-----------------------------------------------> store input text
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    if (/^[A-Z]$/i.test(value[value.length - 1]) || value === "") {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  //-----------------------------------------------> store city
  const selectOption = (e) => {
    setData({
      ...data,
      city: e.target.outerText,
      cname: e.currentTarget.value,
    });

    setShowOption(false);
  };

  //-----------------------------------------------> onClick start Button
  const start = () => {
    const { fname, lname, city, cname } = data;

    // checking if all fields are field
    if (fname && lname) {
      //save data in cookie
      fetch("/cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          un: `${fname}+${lname}`,
          [city]: cname,
        }),
      });

      navigate(`/${city}/home`);
    } else {
      alert("please enter your full name");
    }
  };

  //-----------------------------------------------> Return Component
  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Clean City</p>
      </div>
      <p className={styles.title}>Clean City</p>
      <p className={styles.link}>
        already have an account ?<NavLink to="/login">Log In</NavLink>
      </p>
      <div className={styles.form}>
        <InputBox
          title={"First Name"}
          onChangeHandler={onChangeHandler}
          name="fname"
          value={data.fname}
        />
        <InputBox
          title={"Last Name"}
          onChangeHandler={onChangeHandler}
          name="lname"
          value={data.lname}
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
          <div
            className={styles.options}
            style={{ display: showOption ? "flex" : "none" }}
          >
            {cities.map((data, index) => (
              <Button key={index} value={data.id} onClick={selectOption}>
                {data.name}
              </Button>
            ))}
          </div>
        </div>
        <Button className={styles.start} onClick={start}>
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
    padding: 20,
    maxWidth: 600,
    maxHeight: 750,
    height: "100%",
    margin: "auto",
    overflow: "auto",
    backgroundColor: "white",
    borderRadius: 5,
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
    flex: 1,
    minHeight: 400,
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
    width: "100%",
    padding: 10,
    marginInline: "auto",
  },
});
