import cookie from "js-cookie";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
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
        const ai = cookie.get("ai");
        const ci = cookie.get("ci");
        const cleanBusiness = await axios.get(`/${ci}/${ai}/shops`);

        isMounted && setBusinesses(cleanBusiness.data);
      } catch (e) {
        cookie.remove("ai");
        navigate("/city/home");
        console.log("error in business");
      }
    };

    getbusinesses();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <>
      {businesses.map((data) => (
        <Card
          key={data.id}
          title={data.name}
          content={data.address}
          img={data.img}
          onClickHandler={() => {
            navigate(`/city/home/${data.id}`);
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
