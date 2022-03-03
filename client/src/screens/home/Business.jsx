import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { Card } from "../../components";
import { BTN_STYLE } from "../../constants";
import { Context } from "../../contexts/CartProvider";

export default function Business() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { setCart } = useContext(Context);
  const [businesses, setBusinesses] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    //-----------------------------------------------> fetch businesse in areas
    const getbusinesses = async () => {
      try {
        const ai = Cookies.get("ai");

        if (ai !== "undefined") {
          const response = await axios.get(`/area/bussinesses/${ai}`);

          if (response.status === 200) {
            isMounted && setBusinesses(response.data);
          } else {
            alert("shop is removed");
          }
        } else {
          Cookies.remove("ai");
          navigate("/city/home/areas");
        }
      } catch (e) {
        Cookies.remove("ai");
        navigate("/city/home");
      }
    };

    getbusinesses();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  //-----------------------------------------------> select areas
  const selectArea = () => {
    Cookies.remove("ai");
    setCart([]);
    navigate("/city/home/areas");
  };

  return (
    <>
      <Button onClick={selectArea} className={styles.btn}>
        change area
      </Button>
      {businesses.map((data) => {
        return (
          data.name &&
          data.address && (
            <Card
              key={data._id}
              title={data.name}
              content={data.address}
              img={data.img}
              onClickHandler={() => {
                navigate(
                  `/city/home/${data.name}, ${data.address}+${data._id}`
                );
              }}
            />
          )
        );
      })}
    </>
  );
}

//-----------------------------------------------> custom styles
const useStyles = makeStyles({
  btn: {
    ...BTN_STYLE,
    width: "90%",
    marginBlock: 20,
    marginInline: "auto",
  },
});
