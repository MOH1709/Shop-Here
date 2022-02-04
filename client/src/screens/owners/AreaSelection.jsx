import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { AreaSelectionCard } from "../../components/owner";
import { Card } from "../../components";
import { BTN_STYLE } from "../../constants";
import { Context } from "../../contexts/SelectedAreas";

export default function AreaSelection() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const { selectedAreas, setSelectedAreas } = useContext(Context);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;
    // fetch area
    const getAreas = async () => {
      try {
        // fetch areas from cname in Cookies
        const ci = Cookies.get("ci");
        const bx = Cookies.get("bx");

        const { data, status } = await axios.get(`/${ci}/areas`);
        const resSelAreas = await (
          await axios.get(`/${bx}/shopareas`)
        ).data.areas;

        if (status === 200) {
          if (isMounted) {
            let sa = [],
              ar = [];
            data.forEach((element) => {
              if (resSelAreas.includes(element._id)) {
                sa.push(element);
              } else {
                ar.push(element);
              }
            });

            setSelectedAreas(sa);
            setAreas(ar);
          }
        }
      } catch (e) {
        alert("Error in getting Areas");
      }
    };
    getAreas();

    return () => {
      isMounted = false;
    };
  }, []);

  //-----------------------------------------------> deSelectArea
  const deSelectArea = (data) => {
    setAreas([data, ...areas]);
    setSelectedAreas(selectedAreas.filter((val) => val._id !== data._id));
  };

  //-----------------------------------------------> selectArea
  const selectArea = (data) => {
    setSelectedAreas([data, ...selectedAreas]);
    setAreas(areas.filter((val) => val._id !== data._id));
  };

  //-----------------------------------------------> updateAreas
  const updateAreas = async () => {
    try {
      const bx = Cookies.get("bx");
      await axios.delete(`/${bx}/deleteShopFromAreas`);

      alert("areas updated sucessfully");
      navigate("/city/owner");
    } catch (e) {
      alert("error in updating areas");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Button className={styles.btn} onClick={updateAreas}>
          save
        </Button>

        {selectedAreas.map((data) => (
          <AreaSelectionCard
            key={data._id}
            title={data.name}
            img={data.img}
            content={data.address}
            onClickHandler={() => {
              deSelectArea(data);
            }}
          />
        ))}
        {areas.map((data) => (
          <Card
            key={data._id}
            title={data.name}
            img={data.img}
            content={data.address}
            onClickHandler={() => {
              selectArea(data);
            }}
          />
        ))}
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  main: {
    maxHeight: "100%",
    overflow: "auto",
  },
  btn: {
    ...BTN_STYLE,
    width: "90%",
    height: 40,
    marginBlock: 20,
    marginInline: "auto",
  },
});
