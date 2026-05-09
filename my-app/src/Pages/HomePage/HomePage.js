import React, { useState } from "react";
import Header from "../../Componant/Shared/Header/Header";
import Slider from "../../Componant/HomePage/Slider/Slider";
import AboutUs from "../../Componant/HomePage/AboutUs/AboutUs";
import VideoSection from "../../Componant/HomePage/VideoSection/VideoSection";
import OurService from "../../Componant/HomePage/OurService/OurService";
import ContactUs from "../../Componant/HomePage/ContactUs/ContactUs";
import Footer from "../../Componant/HomePage/Footer/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const onConnect = () => setContactOpen(true);

  return (
    <>
      <Header onConnect={onConnect} />
      <Slider onConnect={onConnect} />
      <AboutUs />
      <VideoSection />
      <OurService />
      <ContactUs toggleForm={contactOpen} setToggleForm={setContactOpen} />
      <Footer />
    </>
  );
}
