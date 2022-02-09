import Cookies from "js-cookie";
import axios from "axios";
// import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { Card } from "../../components";

export default function Business() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    //-----------------------------------------------> fetch businesse in areas
    const getbusinesses = async () => {
      try {
        const ai = Cookies.get("ai");

        if (ai !== "undefined") {
          const cleanBusiness = await axios.get(`/area/bussinesses/${ai}`);
          isMounted && setBusinesses(cleanBusiness.data);
        } else {
          Cookies.remove("ai");

          navigate("/city/home/areas");
        }
      } catch (e) {
        Cookies.remove("ai");
        navigate("/city/home/areas");
        // alert("error in fetching shops");
      }
    };

    getbusinesses();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <>
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

// //-----------------------------------------------> Styles
// const useStyles = makeStyles({
//   container: {
//     position: "relative",
//   },
// });
