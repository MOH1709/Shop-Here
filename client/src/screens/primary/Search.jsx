import axios from "axios";
import Cookies from "js-cookie";

import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom components
import { Card, ShopDetailBox } from "../../components";
import { COLOR, FLEX_CENTER } from "../../constants";

export default function Search() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> sorting function
  const sortByCategory = (a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  };

  //-----------------------------------------------> get search result
  const searchProduct = async () => {
    try {
      const ci = Cookies.get("ci");
      const res = await axios.post(`/product/${ci}`, {
        text,
      });

      setProducts(res.data.sort(sortByCategory) || []);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.inputDiv}>
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src="./icons/backArrow.svg" alt="back" />
          </span>
          <input
            type="text"
            placeholder="product name"
            autoFocus={true}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <span className={styles.icon} onClick={searchProduct}>
            <img src="./icons/search.svg" alt="search" height="20" />
          </span>
        </div>
      </div>

      {products.map((data, index) => (
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

          <Card
            title={data.name}
            img={data.img}
            content={
              <p>
                price: <span className={styles.price}>{data.price}₹</span>
              </p>
            }
            onClickHandler={() => {
              setProduct(data);
              setShowDetail(true);
            }}
          />
        </div>
      ))}

      <ShopDetailBox
        toShow={showDetail}
        setToShow={setShowDetail}
        state={product}
      />
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    backgroundColor: "white",
    zIndex: 999,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingBlock: 20,
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.SECONDARY,
  },
  inputDiv: {
    "& input": {
      flex: 1,
      width: 50,
      letterSpacing: 0.5,
      paddingInline: 5,
      border: "none",
      outline: "none",
    },
    "& span": {
      ...FLEX_CENTER,
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: COLOR.PRIMARY,
      cursor: "pointer",
    },
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: 3,
    height: 46,
    borderRadius: 5,
    backgroundColor: "white",
  },
  price: {
    color: COLOR.GREEN,
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
