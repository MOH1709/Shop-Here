import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//-----------------------------------------------> custom components
import { ProductCard } from "../../components/user";
import { Context } from "../../contexts/CartProvider";
import { COLOR, SHADOW } from "../../constants";

export default function Product() {
  const styles = useStyles();
  const { bid } = useParams();
  const { cart } = useContext(Context);

  const [shop] = useState(bid.split("+"));
  const [products, setProducts] = useState([]);
  const [shopData, setShopData] = useState({
    phoneNumber: "",
    email: "",
    isOpen: true,
    MOV: "",
    canUrgent: false,
  });

  //-----------------------------------------------> onLoad
  useEffect(() => {
    let isMounted = true;

    // fetching and setting products of shop
    const getProducts = async () => {
      try {
        if (isMounted) {
          const response = (
            await axios.get(`/bussiness/uservisible/${shop[1]}`)
          ).data;
          setShopData({
            phoneNumber: response.extras[0].phoneNumber,
            email: response.extras[1].email,
            isOpen: response.isOpen,
            canUrgent: response.canUrgent,
            MOV: response.minOrderValue,
          });

          const sortByCategory = (a, b) => {
            if (a.category < b.category) {
              return -1;
            }
            if (a.category > b.category) {
              return 1;
            }
            return 0;
          };

          setProducts(response.products.sort(sortByCategory));
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

  //-----------------------------------------------> returning component
  return (
    <>
      {shopData.isOpen || (
        <div className={styles.close}>shop is closed right now 😞</div>
      )}
      <div className={styles.shopDetails}>
        <p>
          Email : <span> {shopData.email || "not available"}</span>
        </p>
        <p>
          Contact : <span> {shopData.phoneNumber || "not available"}</span>
        </p>
        <p>
          Minimum order value : <span> {shopData.MOV || 10} ₹</span>
        </p>
      </div>

      <div style={{ display: shopData.isOpen ? "block" : "none" }}>
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
                state={data}
                canUrgent={shopData.canUrgent}
                shop={shop}
                MOV={shopData.MOV}
                isAdded={cart.find((val) => val._id === data._id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  shopDetails: {
    "& p": {
      lineHeight: 1.3,
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    "& span": {
      color: COLOR.PRIMARY,
    },
    paddingLeft: 10,
    paddingBlock: 20,
    borderRadius: 5,
    overflow: "hidden",

    boxShadow: SHADOW,
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
  category: {
    fontWeight: "bold",
    width: "91%",
    marginLeft: "5%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginTop: 30,
    borderBottom: "2px solid rgba(0,0,0,0.5)",
  },
});
