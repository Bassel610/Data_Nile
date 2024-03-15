import React, { useState, useEffect } from 'react';

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            goToNext();
        }, 10000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const sliderStyles = {
        position: "relative",
        height: "100%",
    };

    const slideStyles = {
        width: "100%",
        height: "700px",
        objectFit: "cover",
        overflow: "hidden"
        
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "black",
        zIndex: 1,
        cursor: "pointer",
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "black",
        zIndex: 1,
        cursor: "pointer",
    };

    const dotsContainerStyles = {
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
    };

    const dotStyle = {
        margin: "0 3px",
        cursor: "pointer",
        fontSize: "20px",
    };

    return (
        <div style={sliderStyles}>
            <div>
                <div onClick={goToPrevious} style={leftArrowStyles}>❰</div>
                <div onClick={goToNext} style={rightArrowStyles}>❱</div>
            </div>
            {slides.map((slide, index) => (
                <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                    {slide.type === 'image' && (
                        <img className='slideStyles' src={slide.url} alt={`Slide ${index + 1}`} style={slideStyles} />
                    )}
                    {slide.type === 'video' && (
                        <video className='slideStyles'  autoPlay loop muted style={slideStyles}>
                            <source src={slide.url} type="video/mp4" />
                        </video>
                    )}
                </div>
            ))}
            <div style={dotsContainerStyles}>
                {slides.map((_, slideIndex) => (
                    <div
                        style={dotStyle}
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
