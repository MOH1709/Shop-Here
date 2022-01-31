import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { ProductCard, AddProductBox } from "../../components/owner";
import { BTN_STYLE } from "../../constants";
import { AlertBox } from "../../components";
import { useEffect } from "react";

export default function Inventory() {
  const styles = useStyles();
  const [showBox, setShowBox] = useState(false);
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const bx = cookie.get("bx");
        isMounted && setProducts([]);
      } catch (e) {
        alert("error in loading inventory");
      }
    };

    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  //-----------------------------------------------> addProduct
  const addProduct = (data) => {
    setShowBox(false);

    if (!(data.name || data.price)) {
      alert("sorry to add new product, name and price required must!!");
    } else {
      setProducts([...products, data]);
    }
  };

  //-----------------------------------------------> edit added product
  const editProduct = (data) => {
    setShowBox(false);
  };

  return (
    <div className={styles.container}>
      {products.map((data, index) => (
        <ProductCard
          key={index}
          img={data.img}
          mrp={data.mrp}
          price={data.price}
          title={data.name}
          onClickHandler={editProduct}
        />
      ))}
      <AlertBox
        Style={{ display: showBox ? "flex" : "none" }}
        box={<AddProductBox onSave={addProduct} />}
      />

      <Button
        className={styles.btn}
        onClick={() => {
          setShowBox(true);
        }}
      >
        ADD
      </Button>
      <Button className={styles.btn}>UPLOAD</Button>
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
  btn: {
    ...BTN_STYLE,
    width: "90%",
    marginInline: "auto",
    marginBlock: 20,
  },
});
