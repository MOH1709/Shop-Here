import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard } from "../../components/user";
import { Context } from "../../contexts/CartProvider";

export default function Area() {
  const { bid } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(Context);
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> onLoad
  useEffect(() => {
    getproducts();
  }, []);

  //-----------------------------------------------> fetch area
  function getproducts() {
    // fetch products from bid in db
    // navigate("/404");
    setProducts([
      {
        _id: "1",
        img: "",
        name: "Coco cola 80ml",
        price: "10",
        mrp: "12",
        isAdded: false,
      },
      {
        _id: "2",
        img: "",
        name: "limka 80ml",
        price: "10",
        mrp: "12",
        isAdded: false,
      },
      {
        _id: "3",
        img: "",
        name: "pepsi 80ml",
        price: "10",
        mrp: "12",
        isAdded: false,
      },
    ]);
  }

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
      setCart(cart.filter((data) => data._id !== obj._id));
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
