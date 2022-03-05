import axios from "axios";
import Cookies from "js-cookie";
import imageCompression from "browser-image-compression";

const imageUploader = async(file) => {
  if (file) {
    try {
      const options = {
        maxSizeMB: 2, // (default: Number.POSITIVE_INFINITY)
        maxWidthOrHeight: 600, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
        useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
      };

      const compressedImg = await imageCompression(file, options);

      const fd = new FormData();
      fd.append("img", compressedImg);

      const bx = Cookies.get("bx");
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