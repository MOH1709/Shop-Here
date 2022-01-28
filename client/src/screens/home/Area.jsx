import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//-----------------------------------------------> custom Components
import { Card } from "../../components";

export default function Area() {
  const navigate = useNavigate();
  const { cname } = useParams();
  const [areas, setAreas] = useState([]);

  //-----------------------------------------------> fetch area
  const getAreas = () => {
    // fetch areas from cname in cookie
    //
    setAreas([
      {
        img: "",
        name: "AtmiyaVilla Society",
        address: "godhra road, halol",
        _id: "asd2as31d",
      },
    ]);
  };

  //-----------------------------------------------> onLoad
  useEffect(() => {
    getAreas();
  }, []);

  //-----------------------------------------------> onClick area
  const saveArea = (id) => {
    // save area id in cookie as ai
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
