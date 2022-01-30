import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard } from "../../components/user";
import { Context } from "../../contexts/CartProvider";

export default function Product() {
  const { bid } = useParams();
  const { cart, setCart } = useContext(Context);
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const res = await axios.get(`/${bid}/products`);

        isMounted && setProducts(res.data);
      } catch (e) {
        console.log("error in products");
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, [bid]);

  //-----------------------------------------------> edit Products according to cart
  const editProduct = (obj, isAdded) => {
    setProducts(
      products.map((data) => {
        return data._id === obj._id ? { ...obj, isAdded } : data;
      })
    );

    if (isAdded) {
      const inCart = cart.some((val) => val._id === obj._id);

      if (inCart === false) {
        setCart([...cart, { ...obj, quantity: 1 }]);
      }
    } else {
      setCart(cart.filter((val) => val._id !== obj._id));
    }
  };

  //-----------------------------------------------> returning component
  return (
    <>
      {products.map((data) => (
        <ProductCard
          key={data._id}
          _id={data._id}
          title={data.name}
          price={data.price}
          mrp={data.mrp}
          img={data.img}
          isAdded={data.isAdded}
          onClickHandler={editProduct}
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
