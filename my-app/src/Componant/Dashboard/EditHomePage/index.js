import EditServices from "./EditServices"
import EditAbout from "./EditAbout"

import "./index.css"
import ContactForm from "./ContactForm";

const EditText = () => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px"
         }}>
            <EditAbout />
            <EditServices />
            <ContactForm />
        </div>
    );
};

export default EditText;
