import React from "react";
import CustomSVG from "../ui/media/CustomSVG.tsx";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#524cf1] bg-opacity-80 text-white p-10 mt-14 rounded-2xl mb-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* About Section */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-poppins font-bold">About DailyHub</h4>
                    <p className="text-sm font-roboto">
                        DailyHub delivers the latest news and curated stories to keep you informed.
                        Stay updated with topics that matter most to you.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-poppins font-bold">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to={'/'} className="font-roboto text-sm transition-all duration-200 hover:text-gray-400">Home</Link></li>
                        <li><Link to={'/articles'} className="font-roboto text-sm transition-all duration-200 hover:text-gray-400">Articles</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-poppins font-bold">Contact Us</h4>
                    <a href="mailto:support@dailyhub.com" className="font-roboto text-sm transition-all duration-200 hover:text-gray-400"><b>Email:</b> support@dailyhub.com</a>
                    <a href="tel:+1234567890" className="font-roboto text-sm transition-all duration-200 hover:text-gray-400"><b>Phone:</b> +1 234 567 890</a>
                    <p className="font-roboto text-sm"><b>Address:</b> 123 Main Street, Beirut, Lebanon</p>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-poppins font-bold">Follow Us</h4>
                    <div className="flex flex-row items-center text-center space-x-4">
                        <a href="#">
                            <CustomSVG path="/assets/icons/facebook.svg" svgClassName="w-6 h-6"/>
                        </a>
                        <a href="#">
                            <CustomSVG path="/assets/icons/instagram.svg" svgClassName="w-6 h-6"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center font-roboto text-sm mt-10">
                © {new Date().getFullYear()} <b>DailyHub</b>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
