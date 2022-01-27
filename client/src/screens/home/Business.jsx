import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components";

export default function Area() {
  const navigate = useNavigate();
  const { cname } = useParams();
  const [businesses, setBusinesses] = useState([]);

  //-----------------------------------------------> fetch area
  const getbusinesses = () => {
    // fetch businesses from ai in cookie
    //
    setBusinesses([
      {
        img: "",
        name: "Mahavir General store",
        address: "AtmiyaVilla Society, godhra road, halol",
        _id: "asd2as31d",
      },
    ]);
  };

  //-----------------------------------------------> onLoad
  useEffect(() => {
    getbusinesses();
  }, []);

  return (
    <>
      {businesses.map((data, index) => (
        <Card
          key={index}
          title={data.name}
          content={data.address}
          img={data.img}
          onClickHandler={() => {
            navigate(`/${cname}/home/${data._id}`);
          }}
        />
      ))}
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
