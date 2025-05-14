import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../component/Navbar';
import PaymentModal from '../page/Payment'; // Import PaymentModal

const GroundBooking = () => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSession, setSelectedSession] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State for controlling the payment modal

    useEffect(() => {
        const fetchAvailableDates = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8000/api/ground/available');
                setDates(response.data);
            } catch (error) {
                toast.error('Unable to fetch available dates. Please try again later.');
                console.error('Error fetching dates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableDates();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!selectedDate || !selectedSession) {
            toast.warning('Please select both a date and a session.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8000/api/ground/book', {
                date: selectedDate.toISOString().split('T')[0],
                session: selectedSession,
            });
            toast.success('Booking successful!');

            // Open the payment modal after successful booking
            setIsPaymentModalOpen(true);

            // Update the dates list to reflect the new booking
            setDates((prevDates) =>
                prevDates.map((date) =>
                    date.date === selectedDate.toISOString().split('T')[0]
                        ? { ...date, [selectedSession]: true }
                        : date
                )
            );
        } catch (error) {
            toast.error(error.response?.data?.error || 'Booking failed. Please try again later.');
            console.error('Error during booking:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isDateBooked = (date) => {
        const bookedDate = dates.find((d) => d.date === date.toISOString().split('T')[0]);
        return bookedDate && (bookedDate.afternoon && bookedDate.evening && bookedDate.night);
    };

    const isSessionBooked = (session) => {
        const bookedDate = dates.find((d) => d.date === selectedDate?.toISOString().split('T')[0]);
        return bookedDate && bookedDate[session];
    };

    return (
        <div className="pt-16">
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
                    <h1 className="text-center text-4xl font-extrabold mb-6 text-gray-800 drop-shadow-lg">
                        Turf Hub Ground Booking
                    </h1>

                    {isLoading && (
                        <div className="text-center mb-4">
                            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-indigo-700" />
                            <p className="text-gray-700">Loading available dates...</p>
                        </div>
                    )}

                    <form onSubmit={handleBooking} className="space-y-6">
                        {/* Date Picker */}
                        <div className="space-y-2">
                            <label htmlFor="date" className="block text-xl font-medium text-gray-800">
                                Select Date
                            </label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy/MM/dd"
                                className="border-2 border-gray-300 p-3 w-full rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                minDate={new Date()}
                                filterDate={(date) => !isDateBooked(date)}
                                placeholderText="Pick a date"
                                inline
                            />
                        </div>

                        {/* Session Picker */}
                        <div className="space-y-2">
                            <label htmlFor="session" className="block text-xl font-medium text-gray-800">
                                Select Session
                            </label>
                            <select
                                id="session"
                                value={selectedSession}
                                onChange={(e) => setSelectedSession(e.target.value)}
                                className="border-2 border-gray-300 p-3 w-full rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                disabled={!selectedDate}
                            >
                                <option value="">Choose a Session</option>
                                <option value="afternoon" disabled={isSessionBooked('afternoon')}>
                                    Afternoon
                                </option>
                                <option value="evening" disabled={isSessionBooked('evening')}>
                                    Evening
                                </option>
                                <option value="night" disabled={isSessionBooked('night')}>
                                    Night
                                </option>
                            </select>
                            {!selectedDate && (
                                <p className="text-red-600 text-sm">Please select a date first.</p>
                            )}
                        </div>

                        {/* Booking Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`p-4 w-full md:w-1/2 text-white font-bold bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition ${
                                    isLoading || !selectedDate || !selectedSession
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                }`}
                                disabled={isLoading || !selectedDate || !selectedSession}
                            >
                                {isLoading ? 'Booking...' : 'Book Now'}
                            </button>
                        </div>
                    </form>

                    <ToastContainer />
                </div>
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && <PaymentModal onClose={() => setIsPaymentModalOpen(false)} />}
        </div>
    );
};

export default GroundBooking;
