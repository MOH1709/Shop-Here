import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useNavigate, NavLink } from "react-router-dom";

//-----------------------------------------------> Custom Components
import { InputBox } from "../components";
import { BTN_STYLE, COLOR, FLEX_CENTER } from "../constants";

export default function Start() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    city: "",
    cityId: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    // fetch and store cities, in cities state
    const getCities = async () => {
      try {
        // if ci already exist, auto navigate to home page
        if (Cookies.get("ci")) {
          navigate(`/city/home/areas`);
        }

        const response = (await axios.get("/cities")).data;
        if (isMounted) {
          setCities(response);
          setInput({
            fname: "",
            lname: "",
            city: response[0].name,
            cityId: response[0]._id,
          });
        }
      } catch (e) {
        alert("Error in getting cities");
      }
    };
    getCities();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  //-----------------------------------------------> set name of user
  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    // check if the value is not symbol or number
    if (/^[A-Z]$/i.test(value[value.length - 1]) || value === "") {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  //-----------------------------------------------> set value of drop down menu
  const selectOption = (name, id) => {
    setInput({
      ...input,
      city: name,
      cityId: id,
    });

    setShowOption(false);
  };

  //-----------------------------------------------> onClick start Button
  const start = () => {
    const { fname, lname, cityId } = input;

    // checking if all fields are field
    if (!(fname || lname)) {
      alert("please enter your full name");
      return;
    }
    //save input in Cookies
    Cookies.set("ci", cityId, { expires: Infinity });
    Cookies.set("un", `${fname}+${lname}`, { expires: Infinity });

    navigate(`/city/home/areas`);
  };

  //-----------------------------------------------> Return Component
  return (
    <form className={styles.container}>
      <div className={styles.logoDiv}>
        <img src="./logo.png" alt="logo" height="50" />
        <p>Shop Here</p>
      </div>
      <p className={styles.title}>Shop Here</p>
      <p className={styles.link}>
        already have an account ?<NavLink to="/login">Log In</NavLink>
      </p>
      <div className={styles.form}>
        <InputBox
          title={"First Name"}
          onChangeHandler={onChangeHandler}
          name="fname"
          value={input.fname}
        />
        <InputBox
          title={"Last Name"}
          onChangeHandler={onChangeHandler}
          name="lname"
          value={input.lname}
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
            {input.city}
            <img src="./icons/drop.svg" alt=">" />
          </Button>
          <div
            className={styles.options}
            style={{ display: showOption ? "flex" : "none" }}
          >
            {cities.map((input, index) => (
              <Button
                key={index}
                onClick={() => selectOption(input.name, input._id)}
              >
                {input.name}
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

//-----------------------------------------------> Custom styles
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
