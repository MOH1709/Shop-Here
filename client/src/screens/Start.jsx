import axios from "axios";
import cookie from "js-cookie";
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
    cityid: "61da77bdc8276a19e9a07504",
  });
  const [cities, setCities] = useState([]);

  //-----------------------------------------------> on load function
  const getCities = async () => {
    const cleanCities = await axios.get("/cleancities");
    setCities(cleanCities.data);
  };

  //-----------------------------------------------> on load
  useEffect(() => {
    //check for ui and jt in in cookie
    // save ai, cname
    // if navigate to `/${cname}/home/businesses`

    getCities();
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
  const selectOption = (name, id) => {
    setData({
      ...data,
      city: name,
      cityid: id,
    });

    setShowOption(false);
  };

  //-----------------------------------------------> onClick start Button
  const start = async () => {
    const { fname, lname, city, cityid } = data;

    // checking if all fields are field
    if (!(fname || lname)) {
      alert("please enter your full name");
      return;
    }
    //save data in cookie
    cookie.set(city, cityid);
    cookie.set("un", `${fname}+${lname}`);

    navigate(`/${city}/home/areas`);
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
              <Button
                key={index}
                onClick={() => selectOption(data.name, data._id)}
              >
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
