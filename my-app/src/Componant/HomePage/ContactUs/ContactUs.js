import React from "react";
import ContactBand from "./ContactBand";
import ContactModal from "./ContactModal";

export default function ContactUs({ toggleForm, setToggleForm }) {
  const onOpen = () => setToggleForm(true);
  const onClose = () => setToggleForm(false);
  return (
    <>
      <ContactBand onConnect={onOpen} />
      <ContactModal open={!!toggleForm} onClose={onClose} />
    </>
  );
}

export { ContactBand, ContactModal };
