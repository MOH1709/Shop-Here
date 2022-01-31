import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
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
  const [product, setProduct] = useState({});

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const bx = Cookies.get("bx");
        const res = await axios.get(`/${bx}/products`);

        isMounted && setProducts(res.data);
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
  const addProduct = async (data) => {
    try {
      setShowBox(false);

      if (!(data.name || data.price)) {
        alert("sorry to add new product, name and price required must!!");
      } else {
        await axios.post(`/${Cookies.get("bx")}/products`, data);
        window.location.reload();
      }
    } catch (e) {
      alert("error in adding products");
    }
  };

  //-----------------------------------------------> edit added product
  const editProduct = async (data) => {
    try {
      setShowBox(false);

      await axios.put(`/${Cookies.get("bx")}/products`, data);
      window.location.reload();
    } catch (e) {
      alert("error in editing products");
    }
  };

  return (
    <div className={styles.container}>
      {products.map((data) => (
        <ProductCard
          key={data._id}
          img={data.img}
          mrp={data.MRP}
          price={data.price}
          quantity={data.quantity}
          title={data.name}
          onClickHandler={() => {
            setProduct(data);
            setShowBox(true);
          }}
        />
      ))}
      <AlertBox
        Style={{ display: showBox ? "flex" : "none" }}
        box={
          <AddProductBox
            onSave={product._id ? editProduct : addProduct}
            input={product}
            setInput={setProduct}
            showDelete={product._id ? true : false}
          />
        }
      />

      <Button
        className={styles.btn}
        onClick={() => {
          setProduct({});
          setShowBox(true);
        }}
      >
        ADD
      </Button>
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
