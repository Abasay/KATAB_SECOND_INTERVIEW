import toast from "react-hot-toast";

export const readFileToBase64 = async (file) => {
  console.log(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });

  return data;
};
