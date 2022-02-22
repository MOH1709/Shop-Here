import axios from "./utils/axios";
import Cookies from "js-cookie";

const imageUploader = async(file) => {
  if (file) {
    try {
      const fd = new FormData();
      const bx = Cookies.get("bx");
      fd.append("img", file);

      const res = await axios.post(`/utils/upload/image/${bx}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.filePath;
    } catch (e) {
      alert("error in uploading image");
    }
  }
};

export default imageUploader;