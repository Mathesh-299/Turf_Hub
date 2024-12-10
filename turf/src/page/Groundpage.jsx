import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing

const GroundComponent = () => {
    const grounds = [
        {
            name: 'Turf A',
            price: '₹300/hr',
            contact: '123-456-7890',
            location: 'Location A, City X',
            imageUrl: 'https://via.placeholder.com/400x250', // Add image URLs
        },
        {
            name: 'Turf B',
            price: '₹400/hr',
            contact: '987-654-3210',
            location: 'Location B, City Y',
            imageUrl: 'https://via.placeholder.com/400x250',
        },
        {
            name: 'Turf C',
            price: '₹350/hr',
            contact: '555-123-4567',
            location: 'Location C, City Z',
            imageUrl: 'https://via.placeholder.com/400x250',
        },
    ];

    return (
        <div className="p-4 max-w-6xl mx-auto space-y-6">
            <h1 className="text-center text-3xl font-bold mb-6">Available Grounds</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grounds.map((ground, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="mb-4">
                            {/* Display Image for each ground */}
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
                        <div className="text-center mb-4">
                            <span className="font-medium">Location:</span> {ground.location}
                        </div>

                        {/* Replace button with NavLink for navigation */}
                        <NavLink
                            to={'/ground'} // Update the path based on your routing
                            className="w-full bg-blue-500 text-white p-2 rounded-lg text-center hover:bg-blue-600"
                        >
                            Book Now
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroundComponent;
