import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark mt-3 py-5 text-white w-100 d-grid gap-3" style={{ gridTemplateColumns: "2fr 1fr" }}>
      <div className="d-flex flex-column align-items-start px-5">
        <span className="text-white display-4 font-weight-bold mx-5 my-3">
          iNotebook
        </span>
        <p className="text-white mx-5 mt-2 h5">
        Your notes are secured in the cloud
        </p>
        <span className="mx-5 my-3 relative">
          <a href="https://www.instagram.com/tulsyanslok/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-white h1 mx-2 hover:text-info"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/slok-tulsyan-003786293/"
            target="_blank" rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in text-white h1 mx-2 hover:text-info"></i>
          </a>
          <a href="https://x.com/slok_tulsyan" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-white h1 mx-2 hover:text-info"></i>
          </a>
        </span>
        <p className="text-white h5 font-weight-light mx-5 my-3">
          M a d e &nbsp;&nbsp; w i t h &nbsp; ❤️
        </p>
      </div>
      <div className="text-left">
        <div className="font-weight-bold text-white h4 mb-3">Contact Us</div>
        <div className="d-flex align-items-center gap-2 mb-2">
          <i className="fas fa-map-marker-alt text-white h5 mb-1"></i>
          <p className="text-white font-weight-light mb-0">Durg, Chhattisgarh</p>
        </div>
        <div className="d-flex align-items-center gap-2 mb-2">
          <i className="fas fa-envelope text-white h5 mb-1"></i>
          <p className="text-white font-weight-light mb-0">sloktulsyan@gmail.com</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="fas fa-phone text-white h5 mb-1"></i>
          <p className="text-white font-weight-light mb-0">9931085103</p>
        </div>
      </div>
      <div className="text-end col-span-3 mx-5 font-weight-light">
        © &nbsp; Slok Tulsyan, Student of IIT Bhilai
      </div>
    </div>
  );
};

export default Footer;
