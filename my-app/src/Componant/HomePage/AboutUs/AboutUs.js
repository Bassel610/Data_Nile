import { useEffect, useState } from "react";
import axios from "axios";

import "./AboutUs.css"
function AboutUs() {
    const [aboutContent, setAboutContent] = useState('');

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                // Use a CORS proxy service to bypass CORS restrictions during development
                const response = await axios.get('http://localhost:5000/about');
                setAboutContent(response.data.about);
            } catch (error) {
                console.error('Error fetching about section content:', error);
            }
        };
        fetchAboutContent();
    }, []);

    return (
        <>
            <div className="AboutUs">
                <div>
                    <h2>About Us</h2>
                    <div className="BigText">
                            <p>{aboutContent}</p>
                        </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
