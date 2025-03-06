import { useEffect, useState } from "react";
import axios from "axios";

import "./OurServices.css"
function Services({setIndicator}) {
    const [servicesContent, setServicesContent] = useState([]);

    useEffect(() => {
        setIndicator(true)
        const fetchServicesContent = async () => {
            try {
                const response = await axios.get('http://localhost:5000/services');
                setServicesContent(response.data); // Accessing the 'services' property
                setIndicator(false)
            } catch (error) {
                setIndicator(false)
                console.error('Error fetching Services section content:', error);
            }
        };
        fetchServicesContent();
    }, []);

    return (
        <>
            <div className="OurServices">
                <div>
                    <h2>{servicesContent.title}</h2>
                    <div className="BigText">
                    <p>{servicesContent.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services;
