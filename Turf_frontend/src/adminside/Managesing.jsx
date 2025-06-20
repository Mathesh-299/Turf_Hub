import React, { useEffect, useState } from "react";
import Image1 from '../assets/img/depositphotos_150617828-stock-photo-soccer-ball-on-grass.jpg';
import Image from '../assets/img/photo-1452778374718-046c69a5c02f.jpg';
import Image2 from '../assets/img/photo-1494199505258-5f95387f933c.jpeg';
import Image3 from '../assets/img/premium_photo-1666913667082-c1fecc45275d.jpeg';
const GroundDetailsPage = () => {
    const [grounds, setGrounds] = useState([
        {
            id: 1,
            name: "Chennai Turf Arena",
            location: "Chennai, Tamil Nadu",
            price: "₹1500 per hour",
            description: "State-of-the-art turf for football and cricket.",
            image: Image,
        },
        {
            id: 2,
            name: "Coimbatore Sports Hub",
            location: "Coimbatore, Tamil Nadu",
            price: "₹1200 per hour",
            description: "Perfect for weekend games and tournaments.",
            image: Image1,
        },
        {
            id: 3,
            name: "Madurai Play Ground",
            location: "Madurai, Tamil Nadu",
            price: "₹1000 per hour",
            description: "Ideal for all sports enthusiasts.",
            image: Image2,
        },
        {
            id: 4,
            name: "Salem Sports Center",
            location: "Salem, Tamil Nadu",
            price: "₹1400 per hour",
            description: "Well-maintained turf with premium facilities.",
            image: Image3,
        },
    ]);

    const [selectedGround, setSelectedGround] = useState(null); // For editing
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (selectedGround) {
            setFormData({
                name: selectedGround.name,
                location: selectedGround.location,
                price: selectedGround.price,
                description: selectedGround.description,
                image: selectedGround.image,
            });
            setShowForm(true);
        }
    }, [selectedGround]);

    const handleAddGround = (newGround) => {
        setGrounds([...grounds, newGround]);
    };

    const handleDeleteGround = (groundId) => {
        setGrounds(grounds.filter((ground) => ground.id !== groundId));
    };

    const handleEditGround = (updatedGround) => {
        setGrounds(
            grounds.map((ground) =>
                ground.id === updatedGround.id ? updatedGround : ground
            )
        );
        setSelectedGround(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedGround) {
            handleEditGround({ ...selectedGround, ...formData });
        } else {
            const newGround = { id: Date.now(), ...formData };
            handleAddGround(newGround);
        }

        setFormData({
            name: "",
            location: "",
            price: "",
            description: "",
            image: "",
        });
        setShowForm(false);
    };

    const closeForm = () => {
        setSelectedGround(null);
        setShowForm(false);
        setFormData({
            name: "",
            location: "",
            price: "",
            description: "",
            image: "",
        });
    };

    return (
        <div className="p-6 bg-gray-100" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080?text=Turf+Background')", backgroundSize: "cover" }}>
            <button
                onClick={() => setShowForm(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
            >
                Add New Ground
            </button>

            {showForm && (
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedGround ? "Edit Ground" : "Add New Ground"}
                    </h2>
                    <button
                        onClick={closeForm}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Ground Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        ></textarea>
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            {selectedGround ? "Update Ground" : "Add Ground"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {grounds.map((ground) => (
                    <div
                        key={ground.id}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                    >
                        <img
                            src={ground.image}
                            alt={ground.name}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold">{ground.name}</h3>
                        <p className="text-gray-600">{ground.location}</p>
                        <p className="text-gray-500">{ground.price}</p>
                        <p className="mt-4 text-gray-700">{ground.description}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setSelectedGround(ground)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteGround(ground.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroundDetailsPage;