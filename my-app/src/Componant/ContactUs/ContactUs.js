import "./ContactUs.css"
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'


function ContactUs () {
    // const [profiles, setProfiles] = useState([]);
    const [firname, setfirname] = useState('');
    const [lastemail, setElastemail] = useState('');
    const [joptilte, setjoptilte] = useState('');
    const [companyname, setcompanyname] = useState('');
    const [country, setcountry] = useState('');
    const [businnesemail, setbusinnesemail] = useState('');
    const [mobile, setmobile] = useState('');
    const [solution, setsolution] = useState('');
    const [toggleform, settoggleform] = useState(false)

    let sweatAleartFormSend = () => {
        Swal.fire({
            text: 'Thank You For Contact Us',
            icon: "scsuccess"
        });
    }


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://api.data-nile.com/database', {
            firname,
            lastemail,
            joptilte, 
            companyname,
            country,
            solution,
            businnesemail,
            mobile
        });
        console.log(response.data);
        // Update database with the new data
        // Reset form fields after successful submission
        setfirname('');
        setElastemail('');
        setjoptilte('');
        setcompanyname('');
        setbusinnesemail('');
        setsolution('');
        setmobile('');
        setcountry('');
        sweatAleartFormSend()
        settoggleform(false)
    } catch (error) {
        console.error('Error adding profile:', error);
    }
};


    let toggleformFun = () => {
        toggleform ? settoggleform(false) : settoggleform(true)
    }

    return (
        <>
            <div className="ContactUs">
                <h2>Contact us</h2>
                <h4>Please to contact us click here </h4>
                <button style={{background: "#333", width: "20%"}} onClick={toggleformFun}>Contact Us</button>
            </div>
            <div className={toggleform ? "ContactUsForm displayblock" : "ContactUsForm "}>
                <form onSubmit={handleSubmit}>
                    <div className="CloseForm" onClick={() => settoggleform(false)}>
                        <div></div>
                        <div></div>
                    </div>
                <h1>Contact Us Form</h1>
                    <label>
                        <span>
                        first Name:
                        </span>
                        <input type="text" value={firname} onChange={(e) => setfirname(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        Last Name:
                        </span>
                        <input type="text" value={lastemail} onChange={(e) => setElastemail(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        Jop Title:
                        </span>
                        <input type="text" value={joptilte} onChange={(e) => setjoptilte(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        Company Name:
                        </span>
                        <input type="text" value={companyname} onChange={(e) => setcompanyname(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        Country:
                        </span>
                        <input type="text" value={country} onChange={(e) => setcountry(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        mobile:
                        </span>
                        <input type="number" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        Business Email:
                        </span>
                        <input type="email" value={businnesemail} onChange={(e) => setbusinnesemail(e.target.value)} />
                    </label>
                    <label>
                        <span>
                        solution:
                        </span>
                        {/* <input type="text" value={solution} onChange={(e) => setsolution(e.target.value)} /> */}
                        <select value={solution} onChange={(e) => setsolution(e.target.value)} >
                            <option>Research & Analytics</option>
                            <option>Panel Services</option>
                            <option>Community Management</option>
                        </select>
                    </label>
                    <div className="BTN">
                    <button  type="submit">Send The Invite</button>
                    </div>
            </form>
            </div>
        </>
    )
}

export default ContactUs