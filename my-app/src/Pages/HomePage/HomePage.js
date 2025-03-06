import { useState } from "react";
import Header from "../../Shared/Header/Header";
import Img from "../../Componant/HomePage/Slider/Slider";
import AboutUs from "../../Componant/HomePage/AboutUs/AboutUs";
import OurServices from "../../Componant/HomePage/OurService/OurService";
import VideoSection from "../../Componant/HomePage/VideoSection/VideoSection";
import ContactUs from "../../Componant/HomePage/ContactUs/ContactUs";
import "./HomePage.css";

function HomePage() {
    const [indicator, setIndicator] = useState(true);
    const [toggleForm, setToggleForm] = useState(false);

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
                <Img setIndicator={setIndicator}/>
            </div>
            <AboutUs setIndicator={setIndicator} />
            <VideoSection setIndicator={setIndicator} />
            <OurServices setIndicator={setIndicator} />
            <ContactUs toggleForm={toggleForm} setToggleForm={setToggleForm} />
        </>
    );
}

export default HomePage;
