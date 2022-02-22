import { makeStyles } from "@material-ui/core";
import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { Card } from "../../components";
import { COLOR } from "../../constants";

export default function ProductViewer() {
  const styles = useStyles();
  const { oid } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const res = await axios.get(`/order/${oid}`);

        isMounted && setProducts(res.data.products || []);
      } catch (e) {
        alert("error in fetching order details");
      }
    };

    getProducts();
    return () => {
      isMounted = false;
    };
  }, [oid]);

  return (
    <div className={styles.container}>
      {products.map((data) => (
        <Card
          key={data._id}
          title={data.name}
          img={data.img}
          content={
            <div className={styles.content}>
              {data.quantity} at <span> {data.quantity * data.price}₹ </span>
            </div>
          }
        />
      ))}
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    overflow: "auto",
  },
  content: {
    "& span": {
      color: COLOR.GREEN,
    },
  },
});
