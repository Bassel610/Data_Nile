import axios from "axios";
import React, { useState, useEffect } from "react";

const Slider = ({ setIndicator }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setIndicator(true);
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        const sliderImages =
          response.data?.[0]?.slider?.filter((ele) => ele.isActive === true) ?? [];
        setSlides(sliderImages);
      } catch (error) {
        console.error("Error fetching images section content:", error);
      } finally {
        setIndicator(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setTimeout(() => {
        goToNext();
      }, 5000); // Auto-slide every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div style={styles.slider}>
      {slides.length > 0 ? (
        <>
          <div onClick={goToPrevious} style={styles.arrowLeft}>❰</div>
          <div onClick={goToNext} style={styles.arrowRight}>❱</div>

          <div style={styles.sliderContainer}>
            <div style={{ ...styles.slideTrack, transform: `translateX(-${currentIndex * 100}%)` }}>
              {slides.map((slide, index) => (
                <img key={index} src={slide.url} alt={`Slide ${index + 1}`} style={styles.slide} />
              ))}
            </div>
          </div>

          <div style={styles.dotsContainer}>
            {slides.map((_, slideIndex) => (
              <div
                key={slideIndex}
                style={slideIndex === currentIndex ? styles.dotActive : styles.dot}
                onClick={() => goToSlide(slideIndex)}
              >
                ●
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>No active slides available</p>
      )}
    </div>
  );
};

// ✅ **Styles (Inlined as JavaScript Object)**
const styles = {
  slider: {
    position: "relative",
    width: "100%",
    height: "700px",
    overflow: "hidden",
  },
  sliderContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  slideTrack: {
    display: "flex",
    transition: "transform 0.8s ease-in-out",
    width: "100%",
  },
  slide: {
    minWidth: "100%",
    height: "700px",
    objectFit: "cover",
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "32px",
    fontSize: "45px",
    color: "var(--main-bg)",
    cursor: "pointer",
    zIndex: 2,
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "32px",
    fontSize: "45px",
    color: "var(--main-bg)",
    cursor: "pointer",
    zIndex: 2,
  },
  dotsContainer: {
    position: "absolute",
    bottom: "42px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "5px",
    zIndex: '1'
  },
  dot: {
    fontSize: "20px",
    cursor: "pointer",
    color: "var(--light-bg)",
  },
  dotActive: {
    fontSize: "20px",
    cursor: "pointer",
    color: "var(--main-bg)",
  },
};

export default Slider;
