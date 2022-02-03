import axios from "axios";

const imageUploader = async(file) => {
  if (file) {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post("/upload/image", fd, {
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