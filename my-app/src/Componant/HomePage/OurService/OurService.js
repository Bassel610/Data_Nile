import { useEffect, useState } from "react";
import axios from "axios";

import "./OurServices.css"
function Services() {
    const [servicesContent, setServicesContent] = useState('');

    useEffect(() => {
        const fetchServicesContent = async () => {
            try {
                const response = await axios.get('http://localhost:5000/services');
                setServicesContent(response.data.services); // Accessing the 'services' property
            } catch (error) {
                console.error('Error fetching Services section content:', error);
            }
        };
        fetchServicesContent();
    }, []);

    return (
        <>
            <div className="OurServices">
                <div>
                    <h2>Our Services</h2>
                    <div className="BigText">
                    <p>{servicesContent}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services;
