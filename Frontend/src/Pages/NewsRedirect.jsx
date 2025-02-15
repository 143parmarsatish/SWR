import { useEffect } from "react";

const NewsRedirect = () => {
  useEffect(() => {
    window.location.href = "https://www.livemint.com"; // Redirect to LiveMint
  }, []);

  return <p>Redirecting to news...</p>; // Optional loading text
};

export default NewsRedirect;
