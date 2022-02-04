import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { AreaSelectionCard } from "../../components/owner";

export default function AreaSelection() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [rmAreas, setRmAreas] = useState([]);

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
        const selectedAreas = await (
          await axios.get(`/${bx}/shopareas`)
        ).data.areas;

        if (status === 200) {
          if (isMounted) {
            setRmAreas(selectedAreas);

            setAreas(
              data.map((val) => {
                return {
                  ...val,
                  isSelected: selectedAreas.includes(val.id),
                };
              })
            );
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

  //-----------------------------------------------> select area
  const selectArea = (data) => {
    setAreas(
      areas.map((val) => {
        return val._id !== data._id
          ? val
          : { ...data, isSelected: !data.isSelected };
      })
    );
  };

  return (
    <div className={styles.container}>
      {areas.map((data) => (
        <AreaSelectionCard
          key={data.id}
          title={data.name}
          img={data.img}
          content={data.address}
          isSelected={data.isSelected}
          onClickHandler={() => {
            selectArea(data);
          }}
        />
      ))}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});
