import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard } from "../../components/user";
import { Context } from "../../contexts/CartProvider";

export default function Product() {
  const { bid } = useParams();
  const [shop] = useState(bid.split("+"));
  const { cart, setCart } = useContext(Context);
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const res = await axios.get(`/${shop[1]}/products`);

        isMounted && setProducts(res.data);
      } catch (e) {
        alert("error in getting products of this shop");
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, [shop]);

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
        setCart([
          ...cart,
          { ...obj, quantity: 1, address: shop[0], shopId: shop[1] },
        ]);
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
          quantity={data.quantity}
          title={data.name}
          price={data.price}
          mrp={data.MRP}
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
