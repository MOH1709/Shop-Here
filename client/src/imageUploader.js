import axios from "axios";

const imageUploader = async(filename, file) => {
  const formData = new FormData();
  formData.append(filename, file);

  try {
    const res = await axios.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { fileName, filePath } = res.data;
  } catch (e) {
    alert("error in uploading image");
  }
};

export default imageUploader;