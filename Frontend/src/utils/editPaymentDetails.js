export const uploadQR = async (image) => {
  try {
      const formData = new FormData(); // Corrected syntax
      formData.append('image', image); 

      const response = await fetch(`https://api.imgbb.com/1/upload?key=3970570bf79f59c29563416d2c2f90bb`, {
          method: "POST",
          body: formData, // No need for headers
      });

      const result = await response.json();
      console.log("Uploaded Image URL:", result.data.url);
      return result;
  } 
  catch (error) {
      console.error("Upload Error:", error);
      return error;
  }
};
