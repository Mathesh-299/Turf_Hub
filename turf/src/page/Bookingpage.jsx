import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const BookingPage = () => {
    // const { groundName } = useParams(); // Get the ground name from the URL
    const [selectedSession, setSelectedSession] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    const handleBooking = (e) => {
        e.preventDefault();

        if (!selectedSession) {
            setBookingStatus('Please select a session.');
            return;
        }

        // Simulate booking (You can integrate with your backend here)
        setBookingStatus(`${selectedSession} session booked for ${groundName}!`);
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-center text-3xl font-bold mb-6">Booking for Ground</h1>

            {/* Session Selection */}
            <div className="mb-4">
                <label htmlFor="session" className="block text-sm font-semibold">Select Session</label>
                <select
                    id="session"
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="border p-2 mt-2 w-full"
                >
                    <option value="">Choose a Session</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                </select>
            </div>

            {/* Booking Status Message */}
            {bookingStatus && (
                <div className="text-center text-red-500 mb-4">
                    {bookingStatus}
                </div>
            )}

            {/* Booking Button */}
            <button
                onClick={handleBooking}
                className="bg-blue-500 text-white p-3 w-full mt-4 hover:bg-blue-600"
            >
                Book Now
            </button>
        </div>
    );
};

export default BookingPage;
