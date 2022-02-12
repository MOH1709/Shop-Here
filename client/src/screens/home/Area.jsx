import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

//-----------------------------------------------> custom Components
import { Card } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";

export default function Area() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    if (Cookies.get("ai")) {
      navigate("/city/home/businesses");
    }

    let isMounted = true;
    // fetch area
    const getAreas = async () => {
      try {
        // fetch areas from city in Cookies
        const ci = Cookies.get("ci");
        const cleanAreas = await axios.get(`/cities/areas/${ci}`);

        if (cleanAreas.status === 200) {
          isMounted && setAreas(cleanAreas.data);
        } else {
          navigate("/");
        }
      } catch (e) {
        // Cookies.remove("ci");
        alert("Error in getting Areas");
      }
    };
    getAreas();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  //-----------------------------------------------> onClick area
  const saveArea = (id) => {
    // save area id in Cookies as ai
    Cookies.set("ai", id);

    navigate(`/city/home/businesses`);
  };

  return (
    <>
      <div className={styles.title}>
        <img src="./icons/location.svg" alt="location" />
        select your belonging area
      </div>
      {areas.map((data) => (
        <Card
          key={data._id}
          title={data.name}
          content={data.address}
          img={data.img}
          onClickHandler={() => {
            saveArea(data._id);
          }}
        />
      ))}
      <Button
        className={styles.btn}
        component={NavLink}
        to="/city/setting/report"
      >
        none of the above
      </Button>
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  title: {
    "& img": {
      height: 30,
      marginInline: 20,
    },
    fontSize: 20,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 15,
    backgroundColor: COLOR.SECONDARY,
  },
  btn: {
    ...BTN_STYLE,
    width: "80%",
    height: 40,
    marginBlock: 20,
    marginInline: "auto",
  },
});
