export const uploadQR = async (image) => {
  try {
      const formData = new FormData;
      formData.append('image', image); 
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/editqr`, {
          method : "POST",
          headers : {
              'authorization' : localStorage.getItem('accessToken'),
            },
          body : formData,
      })

      const result = await response.json();
      console.log(result);
      return result;
  } 
  catch (error) {
      return error;
  }
}