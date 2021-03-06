import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeStyles, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard, AddProductForm } from "../../components/owner";
import { BTN_STYLE } from "../../constants";
import { AlertBox, OnSwipe } from "../../components";

export default function OwnerInventory() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [showBox, setShowBox] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  //-----------------------------------------------> sort products
  const sortByCategory = (a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  };

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const bx = Cookies.get("bx");
        const res = await axios.get(`/bussiness/uservisible/${bx}`);

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
        const res = await axios.post(`/product/${ci}/${bx}`, data);
        setProducts(
          [...products, { _id: res.data._id, ...data }].sort(sortByCategory)
        );
      }
    } catch (e) {
      alert("error in adding products");
    }
    return true;
  };

  //-----------------------------------------------> edit added product
  const editProduct = async (data) => {
    try {
      const bx = Cookies.get("bx");

      setShowBox(false);

      await axios.put(`/product/${bx}`, data);
      setProducts(
        [...products.filter((val) => val._id !== data._id), data].sort(
          sortByCategory
        )
      );
    } catch (e) {
      alert("error in editing products");
    }
  };

  return (
    <div className={styles.container}>
      <OnSwipe
        onSwipeRight={() => {
          navigate("/city/owner/profile");
        }}
      />
      <Button
        style={{ display: products.length > 100 ? "none" : "flex" }}
        className={styles.btn}
        onClick={() => {
          setProduct({});
          setShowBox(true);
        }}
      >
        ADD
      </Button>
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

      {/* add or edit product form */}
      <AlertBox
        Style={{ display: showBox ? "flex" : "none" }}
        box={
          <AddProductForm
            onSave={product._id ? editProduct : addProduct}
            input={product}
            onDelete={() => {
              setProducts(
                [...products.filter((val) => val._id !== product._id)].sort(
                  sortByCategory
                )
              );
              setShowBox(false);
            }}
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
