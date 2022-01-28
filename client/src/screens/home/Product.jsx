import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../../components";

export default function Area() {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //-----------------------------------------------> fetch area
  const getproducts = () => {
    // fetch products from bid in db
    // navigate("/404");
    setProducts([
      {
        _id: "1",
        img: "",
        name: "Coco cola 80ml",
        price: "10",
        mrp: "12",
      },
      {
        _id: "2",
        img: "",
        name: "limka 80ml",
        price: "10",
        mrp: "12",
      },
      {
        _id: "3",
        img: "",
        name: "pepsi 80ml",
        price: "10",
        mrp: "12",
      },
    ]);
  };

  //-----------------------------------------------> onLoad
  useEffect(() => {
    getproducts();
  }, []);

  //-----------------------------------------------> returning component
  return (
    <>
      {products.map((data) => (
        <ProductCard
          key={data._id}
          id={data._id}
          title={data.name}
          price={data.price}
          mrp={data.mrp}
          img={data.img}
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
