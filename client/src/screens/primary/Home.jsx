import { makeStyles } from "@material-ui/core";
import { Card, ProductCard } from "../../components";

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Card
        img="./test.jpg"
        title={"Mahavir Kiraana Store dsajdans"}
        content={"Atmiyavilla Society, godhra road, halol"}
      />
      <ProductCard title={"Coco cola 80ml"} mrp="12" price="10" />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    flex: 1,
    position: "relative",
    overflowY: "auto",
  },
});
