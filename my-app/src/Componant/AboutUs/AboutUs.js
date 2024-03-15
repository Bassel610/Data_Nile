import { useEffect, useState } from "react";
import "./AboutUs.css"
import axios from "axios";
// import EditAbout from "../EditText/EditText";

function AboutUs() {
    const [aboutContent, setAboutContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                // Use a CORS proxy service to bypass CORS restrictions during development
                const response = await axios.get('https://api.data-nile.com/about');
                setAboutContent(response.data.about);
            } catch (error) {
                console.error('Error fetching about section content:', error);
                setError('Failed to fetch about section content. Please try again later.');
            }
        };
        fetchAboutContent();
    }, []);

    const handleUpdate = (newContent) => {
        setAboutContent(newContent);
    };

    return (
        <>
            <div className="AboutUs">
                <div>
                    <h2>About Us</h2>
                    {error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <div className="BigText">
                            <p>{aboutContent}</p>
                            {/* Welcome to Elite Group, your dedicated partner for data-driven success in Egypt. With a focus on providing unparalleled data services, we specialize in data collection utilizing cutting-edge technologies, comprehensive analysis, survey design, and deep-dive studies. Our expertise extends to crafting strategic business plans for CAPI, CATI, and CAWI systems. */}
                        </div>
                    )}
                    {/* <EditAbout onUpdate={handleUpdate} /> */}
                </div>
            </div>
        </>
    );
}

export default AboutUs;
