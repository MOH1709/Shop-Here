import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";

//-----------------------------------------------> custom components
import { ProductCard, AddProductBox } from "../../components/owner";
import { BTN_STYLE } from "../../constants";
import { AlertBox } from "../../components";

export default function OwnerInventory() {
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
        const res = await axios.get(`/bussiness/uservisible/${bx}`);

        const sortByCategory = (a, b) => {
          if (a.category < b.category) {
            return -1;
          }
          if (a.category > b.category) {
            return 1;
          }
          return 0;
        };

        isMounted && setProducts(res.data.products.sort(sortByCategory));
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
      const ci = Cookies.get("ci");
      const bx = Cookies.get("bx");

      setShowBox(false);

      if (!(data.name || data.price)) {
        alert("sorry to add new product, name and price required must!!");
      } else {
        await axios.post(`/product/${ci}/${bx}`, data);
        window.location.reload();
      }
    } catch (e) {
      alert("error in adding products");
    }
  };

  //-----------------------------------------------> edit added product
  const editProduct = async (data) => {
    try {
      const bx = Cookies.get("bx");

      setShowBox(false);

      await axios.put(`/product/${bx}`, data);
      window.location.reload();
    } catch (e) {
      alert("error in editing products");
    }
  };

  return (
    <div className={styles.container}>
      {products.map((data, index) => {
        return (
          <div key={data._id}>
            <p
              style={{
                display:
                  products[index - 1]?.category !== products[index].category
                    ? "block"
                    : "none",
              }}
              className={styles.category}
            >
              {data.category || "Extras"}
            </p>
            <ProductCard
              key={data._id}
              state={data}
              onClickHandler={() => {
                setProduct(data);
                setShowBox(true);
              }}
            />
          </div>
        );
      })}
      <Button
        style={{ display: products.length > 200 ? "none" : "flex" }}
        className={styles.btn}
        onClick={() => {
          setProduct({});
          setShowBox(true);
        }}
      >
        ADD
      </Button>
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
  category: {
    fontWeight: "bold",
    width: "91%",
    borderBottom: "2px solid rgba(0,0,0,0.5)",
    marginLeft: "5%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginTop: 30,
  },
});
