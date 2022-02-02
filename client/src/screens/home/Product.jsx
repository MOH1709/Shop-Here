import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard } from "../../components/user";
import { Context } from "../../contexts/CartProvider";
import { COLOR } from "../../constants";

export default function Product() {
  const styles = useStyles();
  const { bid } = useParams();
  const [shop] = useState(bid.split("+"));
  const { cart, setCart } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [shopData, setShopData] = useState({
    phoneNumber: "",
    email: "",
    isOpen: true,
  });

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const { data } = await axios.get(`/${shop[1]}/withproducts`);

        if (isMounted) {
          setShopData({
            phoneNumber: data.extras[0].phoneNumber,
            email: data.extras[1].email,
            isOpen: data.isOpen,
          });
          setProducts(data.products);
        }
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
      {shopData.isOpen || (
        <div className={styles.close}>shop is closed right now 😞</div>
      )}
      <div className={styles.shopDetails}>
        <p>
          Email <span> {shopData.email || "not available"}</span>
        </p>
        <p>
          Contact <span> {shopData.phoneNumber || "not available"}</span>
        </p>
      </div>

      <div style={{ display: shopData.isOpen ? "block" : "none" }}>
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
      </div>
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  shopDetails: {
    "& p": {
      marginBlock: 10,
      color: COLOR.SECONDARY,
    },
    "& span": {
      marginLeft: 5,
      color: COLOR.PRIMARY,
      fontWeight: "bold",
    },
    paddingBlock: 5,
    borderRadius: 5,
    width: "80%",
    marginInline: "auto",
    borderBottom: "3px solid rgba(0,0,0,0.4)",
  },
  close: {
    paddingBlock: 10,
    color: COLOR.RED,
    borderRadius: 3,
    width: "100%",
    marginInline: "auto",
    fontWeight: "bold",
    textAlign: "center",
  },
});
