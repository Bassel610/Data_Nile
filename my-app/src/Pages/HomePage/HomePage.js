import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import Back1 from "../../Media/Back1.jpg";
import Back2 from "../../Media/Back2.jpg";
import Vid from "../../Media/video-background.mp4";
import Vid2 from "../../Media/pexels-rodnae-productions-7947465 (1080p).mp4";
import Back3 from "../../Media/pexels-lukas-590022 (1).jpg";
import Img from "../../Componant/HomePage/Slider/Slider";
import AboutUs from "../../Componant/HomePage/AboutUs/AboutUs";
import OurServices from "../../Componant/HomePage/OurService/OurService";
import VideoSection from "../../Componant/HomePage/VideoSection/VideoSection";
import ContactUs from "../../Componant/HomePage/ContactUs/ContactUs";
import "./HomePage.css";

function HomePage() {
    const [indicator, setIndicator] = useState(true);
    const [toggleForm, setToggleForm] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIndicator(false);
            document.body.style.overflow = "auto";
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const slides = [
        { type: "image", url: Back1 },
        { type: "image", url: Back2 },
        { type: "image", url: Back3 },
        { type: "video", url: Vid },
        { type: "video", url: Vid2 },
    ];

    return (
        <>
            {indicator && (
                <div className="indicator">
                    <div className="OverLayer"></div>
                    <span className="loader"></span>
                </div>
            )}
            <Header OpenDialog={() => setToggleForm(true)} />
            <div className="Slider">
                <Img slides={slides} />
            </div>
            <AboutUs />
            <VideoSection />
            <OurServices />
            <ContactUs toggleForm={toggleForm} setToggleForm={setToggleForm} />
        </>
    );
}

export default HomePage;
