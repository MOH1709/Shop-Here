import axios from "axios";
import Cookies from "js-cookie";
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
        alert("shop is removed");
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
