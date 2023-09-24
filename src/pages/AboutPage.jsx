import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'
import markerIcon from '../assets/img/marker.png'
import toys2Image from '../assets/img/toys2.jpg'
import treeImage from '../assets/img/tree.png'

const AnyReactComponent = () => (
    <img
        src={markerIcon}
        style={{
            height: '45px',
            width: '35px',
            transform: 'translate(-50%, -100%)'
        }}
    />
)

export function AboutPage() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const branchLocations = [
        { label: "Bat Yam", street: "Yoseftal 45 St", coords: { lat: 32.015573, lng: 34.755201 } },
        { label: "Hadera", street: "Israel National Trail 10 St", coords: { lat: 32.439343, lng: 34.888159 } },
        { label: "Tel Aviv", street: "King George 38 St", coords: { lat: 32.072708, lng: 34.774535 } }
    ]

    return (
        <main className="about-container">
            <h1>About Us</h1>
            <section className="about-hero">
                <h2>Welcome to Mr. Toy</h2>
                <p>Where dreams come alive and imagination knows no bounds!</p>
                <div className="about-hero-imgs">
                    <img src={treeImage} alt="About Us img" />
                    <img src={toys2Image} alt="About Us img" />
                    <img src={treeImage} alt="About Us img" />
                </div>
            </section>
            <section className="about-story">
                <h2>Our Story</h2>
                <p>Founded in 2022, Mr. Toy began with a vision to bring joy to the children of the world, with an additional focus on being enviromentally friendly.</p>
                <p>Our toys are more than just playthings, they are tools for learning, exploring, and growing.</p>
                <p>We hope, that our products can reignite the creativity and imagination of your child!</p>
                <br />
                <p>Our planet deserves care, and so do our children. All the toys sold in the shop are made from recycled materials and delivered in eco-friendly packaging.</p>
                <p>Play today, preserve tomorrow. Our company is committed to Sustainability</p>
                <br />
                <p>We're proud to feature toys from artisans around the world, each bringing a unique touch to our collection.</p>
                <p>From handcrafted wooden toys to innovative tech gadgets, our makers are the heart of our shop.</p>
            </section>
            <section className="about-branches">
                <h2>Our Branches</h2>
                <div className="about-branches-locations">
                    {branchLocations.map((branch, index) => (
                        <div key={index} className="branch-item">
                            <button onClick={() => setCoordinates(branch.coords)}>
                                <i className="fa-solid fa-magnifying-glass-location"></i>
                            </button>
                            <p>{branch.label}, {branch.street}</p>
                        </div>
                    ))}
                </div>
                <div style={{ height: '75vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAe86zmZ8GyA3TjyJEVlCdbPyQuyEDEDgU" }}
                        center={coordinates}
                        defaultZoom={zoom}
                    >
                        <AnyReactComponent {...coordinates} />
                    </GoogleMapReact>
                </div>
            </section>
            <section className="about-contact">
                <h2>Get In Touch</h2>
                <p>If you have any questions, suggestions, feel free to contact us via the following ways:</p>
                <div className="contact-method">
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:valerykuvshinuv@gmail.com">mr-toy@gmail.com</a>
                </div>
                <div className="contact-method">
                    <i className="fa-solid fa-phone-volume"></i>
                    +972-52-474-4605
                </div>
                <div className="contact-method">
                    <a href="https://www.instagram.com/valeriy.kuvshin.ov/" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i> Mr. Toy
                    </a>
                </div>
                <div className="contact-method">
                    <a href="https://www.linkedin.com/in/valeriy-kuvshinov-85b14b282/" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin"></i> Mr. Toy Inc
                    </a>
                </div>
            </section>
        </main>
    )
}