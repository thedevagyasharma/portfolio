'use client';

import './Footer.styles.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p className="footer-message">Still here? Let's chat.</p>

                    <div className="footer-links">
                        <a
                            href="https://linkedin.com/in/devagyasharma"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-button"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href="mailto:devagyasharma9@gmail.com"
                            className="footer-button"
                        >
                            Email ↗
                        </a>
                    </div>

                    <p className="footer-copyright">Dev Sharma © 2025</p>
                </div>
            </div>
        </footer>
    );
}
