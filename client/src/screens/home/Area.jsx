import axios from "axios";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//-----------------------------------------------> custom Components
import { Card } from "../../components";

export default function Area() {
  const navigate = useNavigate();
  const { cname } = useParams();
  const [areas, setAreas] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    // fetch area
    const getAreas = async () => {
      try {
        // fetch areas from cname in cookie
        const ci = cookie.get(cname);
        const cleanAreas = await axios.get(`/${ci}/areas`);

        if (cleanAreas.status === 200) {
          setAreas(cleanAreas.data);
        } else {
          navigate("/");
        }
      } catch (e) {
        console.log("error in areas");
      }
    };

    getAreas();
  }, [cname, navigate]);

  //-----------------------------------------------> onClick area
  const saveArea = (_id) => {
    // save area id in cookie as ai
    cookie.set("ai", _id);

    navigate(`/${cname}/home/businesses`);
  };

  return (
    <>
      {areas.map((data, index) => (
        <Card
          key={index}
          title={data.name}
          content={data.address}
          img={data.img}
          onClickHandler={() => {
            saveArea(data._id);
          }}
        />
      ))}
    </>
  );
}
