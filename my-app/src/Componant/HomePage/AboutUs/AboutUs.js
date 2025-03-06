import { useEffect, useState } from "react";
import axios from "axios";

import "./AboutUs.css"
function AboutUs({setIndicator}) {
    const [aboutContent, setAboutContent] = useState([]);

    useEffect(() => {
        setIndicator(true)
        const fetchAboutContent = async () => {
            try {
                // Use a CORS proxy service to bypass CORS restrictions during development
                const response = await axios.get('http://localhost:5000/about');
                setAboutContent(response.data);
                setIndicator(false)
            } catch (error) {
                setIndicator(false)
                console.error('Error fetching about section content:', error);
            }
        };
        fetchAboutContent();
    }, []);

    return (
        <>
            <div className="AboutUs">
                <div>
                    <h2>{aboutContent.title}</h2>
                    <div className="BigText">
                            <p>{aboutContent.description}</p>
                        </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
