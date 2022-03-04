import axios from "axios";
import Cookies from "js-cookie";
import validator from "validator";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { useEffect, useRef, useState, useContext } from "react";

//-----------------------------------------------> custom component
import { InputBox, LoadingDisplay, OnSwipe, ToggleBtn } from "../../components";
import { BTN_STYLE, COLOR } from "../../constants";
import imageUploader from "../../imageUploader";
import { Context } from "../../contexts/SelectedAreas";

export default function OwnerProfile() {
  const styles = useStyles();
  const { pathname } = useLocation();
  const fileInput = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedAreas } = useContext(Context);

  // for profile pic
  const [img, setImg] = useState("");
  const [prevImg, setPrevImg] = useState("");
  const [file, setFile] = useState(0);

  // for shop input
  const [showBtn, setShowBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [canUrgent, setCanUrgent] = useState(false);
  const [input, setInput] = useState({
    name: "",
    address: "",
    phoneNumber: null,
    email: "",
  });

  //-----------------------------------------------> on load
  useEffect(() => {
    let isMounted = true;

    const getOwnerData = async () => {
      try {
        const bx = Cookies.get("bx");
        if (bx) {
          let res = (await axios.get(`/bussiness/${bx}`)).data;

          if (isMounted) {
            setIsOpen(res.isOpen);
            setCanUrgent(res.canUrgent);
            setShowBtn(true);
            setImg(res.img);
            setPrevImg(res.img);
            setInput({
              name: res.name,
              address: res.address,
              phoneNumber: res.extras[0].phoneNumber,
              email: res.extras[1].email,
            });
          }
        }
      } catch (e) {
        alert("Hello Sir");
      }
    };

    getOwnerData();
    return () => {
      isMounted = false;
    };
  }, []);

  //-----------------------------------------------> storing inputs
  const changeHandler = (e) => {
    const { value, name } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  //-----------------------------------------------> save input
  const updateOwnerData = async () => {
    try {
      const { name, address, phoneNumber, email } = input;
      if (!validator.isEmail(email) || email.split("@")[1] !== "gmail.com") {
        alert("please enter valid email id");
        return;
      }

      setIsLoading(true);
      const bx = Cookies.get("bx");

      let imgPath = img;
      if (prevImg !== img) {
        if (prevImg && img) {
          await axios.delete(`/utils/image/${prevImg.split("?id=")[1]}`);
        }
        imgPath = file ? await imageUploader(file) : img;
      }

      const res = await axios.put(`/bussiness/${bx}`, {
        isOpen,
        canUrgent,
        name,
        areas: selectedAreas.length
          ? selectedAreas.map((input) => input._id)
          : (
              await axios.get(`/bussiness/shopareas/${bx}`)
            ).input,
        img: imgPath,
        address,
        extras: [{ phoneNumber }, { email }],
      });

      if (res.status === 200) {
        setIsLoading(false);
        alert("updated succesfully");
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      alert("error in updating input");
    }
  };

  //----------------------------------------------->
  const selectImage = () => {
    fileInput.current.click();
  };

  //-----------------------------------------------> select areas
  const selectAreas = () => {
    navigate("/city/owner/areaSelection");
  };

  //-----------------------------------------------> fileinput
  const addImage = (e) => {
    try {
      setFile(e.target.files[0]);
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImg(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } catch (e) {
      alert("error in uploading image");
    }
  };

  return (
    <div className={styles.container}>
      <LoadingDisplay isLoading={isLoading} />
      {pathname === "/city/owner/profile" && (
        <OnSwipe
          onSwipeLeft={() => {
            navigate("/city/owner/inventory");
          }}
        />
      )}
      <div className={styles.main}>
        <input
          style={{ display: "none" }}
          onChange={addImage}
          ref={fileInput}
          type="file"
        />
        <div className={styles.imgDiv} onClick={selectImage}>
          <Button className={styles.imgInput}>
            <img
              src={img || "./icons/image.svg"}
              alt="add img"
              className={styles.ppImg}
            />
          </Button>
          <p>Add Image</p>
        </div>
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Shop Name"
          name="name"
          value={input.name}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Shop Address Without Name"
          name="address"
          value={input.address}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Email"
          name="email"
          value={input.email}
          onChangeHandler={changeHandler}
        />
        <InputBox
          Style={{ marginBlock: 20 }}
          title="Business Number"
          name="phoneNumber"
          value={input.phoneNumber}
          onChangeHandler={changeHandler}
          type={"number"}
        />
        {showBtn && (
          <div className={styles.btnDiv}>
            <ToggleBtn
              Style={{ marginBlock: 20 }}
              title={"Shop Open"}
              initialState={isOpen}
              onClickHandler={() => {
                setIsOpen(!isOpen);
              }}
            />
            <ToggleBtn
              Style={{ marginBlock: 20 }}
              title={"Fast Delivery"}
              initialState={canUrgent}
              onClickHandler={() => {
                setCanUrgent(!canUrgent);
              }}
            />
          </div>
        )}
        <Button className={styles.upload} onClick={selectAreas}>
          select areas
        </Button>
        <Button className={styles.upload} onClick={updateOwnerData}>
          Upload
        </Button>
      </div>
    </div>
  );
}

//-----------------------------------------------> Styles
const useStyles = makeStyles({
  container: {
    position: "relative",
    flex: 1,
    overflowY: "auto",
  },
  main: {
    flex: 1,
    minHeight: 400,
    padding: "10%",
  },
  imgDiv: {
    "& p": {
      marginBlock: 5,
      fontWeight: "bold",
      color: COLOR.SECONDARY,
    },
    textAlign: "center",
    cursor: "pointer",
  },

  imgInput: {
    position: "realative",
    ...BTN_STYLE,
    width: 65,
    height: 65,
    overflow: "hidden",
    marginInline: "auto",
    borderRadius: "50%",
  },
  ppImg: {
    minWidth: 65,
    minHeight: 65,
    objectFit: "cover",
  },
  btnDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
  upload: {
    ...BTN_STYLE,
    width: "90%",
    marginBlock: 30,
    marginInline: "auto",
  },
});
