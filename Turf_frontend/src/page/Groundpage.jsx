import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Tennis from '../assets/img/depositphotos_8307714-stock-photo-cricket-ball.jpg';
import Current from '../assets/img/img.jpg';
import Cric from '../assets/img/photo-1721760886713-1ab0c5045bf7.jpeg';
import Foot from '../assets/img/premium_photo-1666913667082-c1fecc45275d.jpeg';
import Navbar from '../component/Navbar';
const GroundComponent = () => {
    const [grounds] = useState([
        {
            id: 1,
            name: 'Chennai Turf Arena',
            price: '₹500/hr',
            contact: '987-654-3210',
            location: 'Chennai, Tamil Nadu',
            availability: 'Open: 6 AM - 10 PM',
            imageUrl: Cric,
        },
        {
            id: 2,
            name: 'Coimbatore Sports Hub',
            price: '₹400/hr',
            contact: '876-543-2109',
            location: 'Coimbatore, Tamil Nadu',
            availability: 'Open: 7 AM - 9 PM',
            imageUrl: Tennis,
        },
        {
            id: 3,
            name: 'Madurai Play Ground',
            price: '₹450/hr',
            contact: '765-432-1098',
            location: 'Madurai, Tamil Nadu',
            availability: 'Open: 8 AM - 11 PM',
            imageUrl:Foot,
        },
        {
            id: 4,
            name: 'Trichy Sports Complex',
            price: '₹350/hr',
            contact: '654-321-0987',
            location: 'Tiruchirappalli, Tamil Nadu',
            availability: 'Open: 6 AM - 8 PM',
            imageUrl:Current,
        },
    ]);

    return (
        <div className="pt-20">
            <Navbar />
            <div className="p-4 max-w-6xl mx-auto space-y-6">
                <h1 className="text-center text-3xl font-bold mb-6">Available Grounds</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grounds.map((ground) => (
                        <div
                            key={ground.id}
                            className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="mb-4">
                                <img
                                    src={ground.imageUrl}
                                    alt={ground.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-center mb-2">{ground.name}</h2>
                            <div className="text-center mb-2">
                                <span className="font-medium">Price:</span> {ground.price}
                            </div>
                            <div className="text-center mb-2">
                                <span className="font-medium">Contact:</span> {ground.contact}
                            </div>
                            <div className="text-center mb-2">
                                <span className="font-medium">Location:</span> {ground.location}
                            </div>
                            <div className="text-center mb-4">
                                <span className="font-medium">Availability:</span> {ground.availability}
                            </div>
                            <NavLink
                                to={"/ground"}
                                className="w-full bg-blue-500 text-white p-2 rounded-lg text-center hover:bg-blue-600"
                            >
                                Book Now
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroundComponent;