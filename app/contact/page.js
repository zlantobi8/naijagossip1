
import Nav1 from "@/app/components/Nav1";
import Footer from "@/app/Footer";
import React from "react";
export const metadata = {
  title: "Contact Us | Trendzlib",
  description: "Get in touch with the Trendzlib team for inquiries, feedback, or support.",
};

export default function Contact() {
    return (
        <div className="bg-light text-dark">
            {/* Logo (Hidden on mobile) */}
         

            {/* Navbar */}
            <div className="navbar-area" style={{ background: '#10284f' }}>
                <Nav1 />
            </div>

            {/* Contact Content */}
            <div className="container py-5" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                <h1 className="text-center mb-4">Contact Us</h1>

                <div className="row">
                    {/* Contact Info */}
                    <div className="col-md-6 mb-4">
                        <h4>Get in Touch</h4>
                        <p>If you have any questions, suggestions, or inquiries, feel free to contact us via any of the channels below.</p>

                        <ul className="list-unstyled">
                            <li><strong>Email:</strong> <a href="mailto:newsroom@trendzlib.com">newsroom@trendzlib.com</a></li>
                            <li><strong>Phone:</strong> <a href="tel:+2347061043812">+2347061043812</a></li>
                            <li><strong>WhatsApp:</strong> <a href="https://wa.me/2347061043812" target="_blank" rel="noopener noreferrer">+2347061043812</a></li>
                            <li><strong>Address:</strong> Lagos State, Nigeria</li>
                        </ul>

                        <h5 className="mt-4">Follow Us</h5>
                        <p>
                            <a href="https://twitter.com/trendzlib" target="_blank" rel="noopener noreferrer" className="me-3">Twitter</a>
                            <a href="https://www.facebook.com/officialtrendzlib" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="col-md-6">
                        <h4>Send Us a Message</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Your name" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows={4} placeholder="Your message"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
