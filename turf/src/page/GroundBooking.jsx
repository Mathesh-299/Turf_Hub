import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroundBooking = () => {
    const [dates, setDates] = useState([]); // Store available dates and session status
    const [selectedDate, setSelectedDate] = useState(null);  // Use null initially
    const [selectedSession, setSelectedSession] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch available dates from the backend
        setIsLoading(true);
        axios.get('http://localhost:8000/api/ground/available')  // Adjust the API endpoint based on your backend
            .then((response) => {
                setDates(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error('Error fetching available dates. Please try again later.');
                setIsLoading(false);
                console.error('Error fetching dates:', err);
            });
    }, []);

    const handleBooking = (e) => {
        e.preventDefault();

        // Ensure both date and session are selected
        if (!selectedDate || !selectedSession) {
            toast.warning('Please select both a date and a session.');
            return;
        }

        // Send booking request to the backend
        setIsLoading(true);

        axios.post('http://localhost:8000/api/ground/book', {
            date: selectedDate.toISOString().split('T')[0],
            session: selectedSession,
        })
            .then((response) => {
                toast.success('Booking Successful!');
                // Update the available dates after booking
                setDates((prevDates) =>
                    prevDates.map((date) =>
                        date.date === selectedDate.toISOString().split('T')[0]
                            ? { ...date, [selectedSession]: true }
                            : date
                    )
                );
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.error || 'Booking failed. Please try again later.');
                setIsLoading(false);
            });
    };

    const isDateBooked = (date) => {
        // Check if the date has any booked session
        const bookedDate = dates.find((d) => d.date === date.toISOString().split('T')[0]);
        return bookedDate && (bookedDate.afternoon || bookedDate.evening || bookedDate.night);
    };

    const isSessionBooked = (session) => {
        // Check if the session is already booked for the selected date
        const bookedDate = dates.find((d) => d.date === selectedDate?.toISOString().split('T')[0]);
        return bookedDate && bookedDate[session];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl p-8 space-y-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-2xl">
                <h1 className="text-center text-4xl font-extrabold mb-6 text-gray-800 drop-shadow-lg">
                    Turf Hub Ground Booking
                </h1>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center mb-4 animate-pulse">
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-700" />
                    </div>
                )}

                {/* Date Picker */}
                <div className="space-y-2">
                    <label htmlFor="date" className="block text-xl font-medium text-gray-800">Select Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="border-2 border-gray-300 p-3 mt-2 w-full rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out"
                        minDate={new Date()} // Prevent selecting past dates
                        filterDate={(date) => !isDateBooked(date)}  // Disable dates that are fully booked
                        placeholderText="Pick a date"
                        inline
                    />
                </div>

                {/* Session Picker */}
                <div className="space-y-2">
                    <label htmlFor="session" className="block text-xl font-medium text-gray-800">Select Session</label>
                    <select
                        id="session"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                        className="border-2 border-gray-300 p-3 mt-2 w-full rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out"
                        disabled={!selectedDate}  // Disable session selection if no date is selected
                    >
                        <option value="">Choose a Session</option>
                        <option value="afternoon" disabled={isSessionBooked('afternoon')}>Afternoon</option>
                        <option value="evening" disabled={isSessionBooked('evening')}>Evening</option>
                        <option value="night" disabled={isSessionBooked('night')}>Night</option>
                    </select>
                </div>

                {/* Booking Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleBooking}
                        className={`bg-indigo-600 text-white p-4 w-full md:w-1/2 mt-4 hover:bg-indigo-700 rounded-md transform transition duration-300 ease-in-out ${isSessionBooked(selectedSession) || !selectedDate || !selectedSession || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={isSessionBooked(selectedSession) || !selectedDate || !selectedSession || isLoading}
                    >
                        {isLoading ? 'Booking...' : 'Book Now'}
                    </button>
                </div>

                {/* Toaster Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default GroundBooking;
