import React from "react";
import "./Footer.css"
const Footer = () => {
    return <footer className={"footer"}>
        <div className="site-footer__graphics">
            <div className="shape"></div>
            <div className="square"></div>
            <div className="circle"></div>

        </div>
        <div className="content">
            <div className="footer-title">
                <img src="src/favicon.png" width="60px" className="footer-img" alt="Logo" />
                <div className="todo">TODO <span>Scheduling app</span></div>
            </div>
            <div className="copyright">© 2017 - <span className="year">2024</span>
            </div>
        </div>

    </footer>
};

export default Footer;