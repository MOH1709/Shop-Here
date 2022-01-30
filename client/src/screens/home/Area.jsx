import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom Components
import { Card } from "../../components";

export default function Area() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    if (cookie.get("ai")) {
      navigate("/city/home/businesses");
    }

    let isMounted = true;
    // fetch area
    const getAreas = async () => {
      try {
        // fetch areas from cname in cookie
        const ci = cookie.get("ci");
        const cleanAreas = await axios.get(`/${ci}/areas`);

        if (cleanAreas.status === 200) {
          isMounted && setAreas(cleanAreas.data);
        } else {
          navigate("/");
        }
      } catch (e) {
        cookie.remove("ci");
        console.log("error in areas");
      }
    };
    getAreas();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  //-----------------------------------------------> onClick area
  const saveArea = (id) => {
    // save area id in cookie as ai
    cookie.set("ai", id);

    navigate(`/city/home/businesses`);
  };

  return (
    <>
      {areas.map((data) => (
        <Card
          key={data.id}
          title={data.name}
          content={data.address}
          img={data.img}
          onClickHandler={() => {
            saveArea(data.id);
          }}
        />
      ))}
    </>
  );
}
