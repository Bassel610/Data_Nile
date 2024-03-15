import Header from "../../Componant/Header/Header"
import Back1 from "../../Media/Back1.jpg"
import Back2 from "../../Media/Back2.jpg"
import Vid from "../../Media/video-background.mp4"
import Vid2 from "../../Media/pexels-rodnae-productions-7947465 (1080p).mp4"
import Back3 from "../../Media/pexels-lukas-590022 (1).jpg"
import Img from "../../Componant/Slider/Slider"
import AboutUs from "../../Componant/AboutUs/AboutUs"
import OurServices from "../../Componant/OurService/OurService"
import VideoSection from "../../Componant/VideoSection/VideoSection"
import ContactUs from "../../Componant/ContactUs/ContactUs"
import { useEffect, useState } from "react"
import "./HomePage.css"
function HomePage () {
    let [indicator, setindicator] = useState(false);

    let indicatorFuntru = () => {
        setindicator(true)
        document.body.style.overflow = 'hidden';
    }
    let indicatorFalseFun = () => {
        setTimeout(() => {
            setindicator(false)
            document.body.style.overflow = 'auto';
        }, 3000)
    }

    useEffect(() => {
        indicatorFuntru()
        indicatorFalseFun()
    }, [])

    const slides = [
        { type: 'image', url: Back1 },
        { type: 'image', url: Back2},
        { type: 'image', url: Back3},
        { type: 'video', url: Vid },
        { type: 'video', url: Vid2 },
    ];
    


    return (
        <>
            {indicator ?
                <>
                    <div className="indicator">
                        <div className="OverLayer"></div>
                        <span class="loader"></span>
                    </div>
                    <Header />
                    <div className="Slider">
                        <Img slides={slides} />
                    </div>
                    <AboutUs />
                    <VideoSection />
                    <OurServices />
                    <ContactUs />
                </>
                :
                <>
                    <Header />
                    <div className="Slider">
                        <Img slides={slides} />
                    </div>
                    <AboutUs />
                    <VideoSection />
                    <OurServices />
                    <ContactUs />
                </>
            }

        </>
    )
}
export default HomePage