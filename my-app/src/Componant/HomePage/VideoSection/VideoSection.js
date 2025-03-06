import { useEffect, useState } from "react";
import axios from "axios";

function VideoSection({ setIndicator }) {
  const [slide, setSlide] = useState(null);

  useEffect(() => {
    setIndicator(true);
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");

        // Check if GalleryPhoto exists before filtering
        const galleryPhotos = response.data?.[0]?.GalleryPhoto ?? [];

        // Find the first active image
        const activeSlide = galleryPhotos.find((ele) => ele.isActive === true);

        setSlide(activeSlide || null); // Ensure slide is not undefined
      } catch (error) {
        console.error("Error fetching images section content:", error);
      } finally {
        setIndicator(false); // Ensure this runs even if an error occurs
      }
    };
    fetchSlides();
  }, []);

  return (
    <div style={{ maxWidth: "99%", height: "832px", position: "relative", left: ".5%", top: "148px" }}>
      {slide?.url ? (
        <img style={{ width: "100%", height: "100%" }} src={slide.url} alt="big" />
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>No active image available</p>
      )}
    </div>
  );
}

export default VideoSection;
