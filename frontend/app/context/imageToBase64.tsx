export const imageToBase64 = async (imgFile) => {
  const reader = new FileReader();
  reader.readAsDataURL(imgFile);
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
