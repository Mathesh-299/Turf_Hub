import { useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuCloudSun, LuMoon, LuSun, LuSunrise } from "react-icons/lu";
import { useLocation } from "react-router";

// Example turf price per slot/hour

const BookingTemplateDark = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeOfDay, setTimeOfDay] = useState("Evening");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const location = useLocation();
    const { turf } = location.state || {};
    const turfPricePerHour = turf?.price;
    // console.log(turf)
    const periods = [
        { label: "Twilight", icon: <LuMoon /> },
        { label: "Morning", icon: <LuSunrise /> },
        { label: "Noon", icon: <LuSun /> },
        { label: "Evening", icon: <LuCloudSun /> },
    ];

    function getStartOfWeek(date) {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
    }

    const getDatesForWeek = () => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentWeekStart);
            d.setDate(currentWeekStart.getDate() + i);
            return d;
        });
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeekStart);
        nextWeek.setDate(currentWeekStart.getDate() + 7);
        setCurrentWeekStart(nextWeek);
        setSelectedDate(nextWeek);
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentWeekStart);
        prevWeek.setDate(currentWeekStart.getDate() - 7);
        setCurrentWeekStart(prevWeek);
        setSelectedDate(prevWeek);
    };

    const generateSlots = (period) => {
        let startHour, endHour;
        switch (period) {
            case "Twilight": startHour = 0; endHour = 6; break;
            case "Morning": startHour = 6; endHour = 12; break;
            case "Noon": startHour = 12; endHour = 18; break;
            case "Evening": startHour = 18; endHour = 24; break;
            default: startHour = 0; endHour = 24;
        }

        const slots = [];
        for (let h = startHour; h < endHour; h++) {
            slots.push(`${h % 12 === 0 ? 12 : h % 12}:00 ${h < 12 ? "am" : "pm"}`);
            slots.push(`${h % 12 === 0 ? 12 : h % 12}:30 ${h < 12 ? "am" : "pm"}`);
        }
        return slots;
    };


    const slots = generateSlots(timeOfDay);
    const firstRow = slots.slice(0, 6);
    const secondRow = slots.slice(6, 12);

    const toggleSlot = (slot) => {
        setSelectedSlots((prev) =>
            prev.includes(slot)
                ? prev.filter((s) => s !== slot)
                : [...prev, slot].sort((a, b) => slots.indexOf(a) - slots.indexOf(b))
        );
    };

    const totalPrice = selectedSlots.length * (turfPricePerHour / 2);


    const getTimeRange = () => {
        if (selectedSlots.length === 0) return "";
        const first = selectedSlots[0];
        const last = selectedSlots[selectedSlots.length - 1];
        return `${first.toUpperCase()} - ${last.toUpperCase()}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center pt-32 space-y-6">
            <div>
                <h1 className="text-white font-bold text-2xl">{turf?.name}</h1>
            </div>
            <hr className="border-white w-full max-w-2xl" />
            <div className="flex items-center space-x-2">
                <button onClick={handlePrevWeek} className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <FaChevronLeft />
                </button>

                {getDatesForWeek().map((date, idx) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${isSelected ? "bg-purple-700 border-2 font-bold" : "bg-neutral-800 hover:bg-neutral-700"}`}
                        >
                            <span className="text-xs">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                            <span className="text-sm font-semibold">
                                {date.getDate()} {date.toLocaleDateString("en-US", { month: "short" })}
                            </span>
                        </button>
                    );
                })}
                <button onClick={handleNextWeek} className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <FaChevronRight />
                </button>
            </div>

            <hr className="border-white w-full max-w-2xl" />

            <div className="flex space-x-2">
                {periods.map((period) => (
                    <button
                        key={period.label}
                        onClick={() => {
                            setTimeOfDay(period.label);
                            setSelectedSlots([]);
                        }}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-full transition ${timeOfDay === period.label ? "bg-purple-700 border-2 font-bold" : "bg-neutral-800 hover:bg-neutral-700"}`}
                    >
                        <span>{period.icon}</span>
                        <span className="text-sm">{period.label}</span>
                    </button>
                ))}
            </div>

            <hr className="border-white w-full max-w-2xl" />

            <div className="flex flex-col space-y-2 w-full max-w-lg">
                {[firstRow, secondRow].map((row, idx) => (
                    <div key={idx} className="flex justify-between space-x-1">
                        {row.map((slot, i) => (
                            <div
                                key={i}
                                onClick={() => toggleSlot(slot)}
                                className={`flex-1 text-center py-2 rounded-full cursor-pointer text-sm transition
                            ${selectedSlots.includes(slot)
                                        ? "bg-purple-700 border-2 font-bold hover:bg-blue-500"
                                        : "bg-neutral-800 hover:bg-neutral-700"
                                    }`}
                            >
                                {slot}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <hr className="border-white w-full max-w-2xl" />

            {selectedSlots.length > 0 && (
                <div className="w-full max-w-2xl px-4 mt-4">
                    <div className="bg-neutral-900 text-white p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold">₹ {totalPrice.toLocaleString()}</p>
                            <p className="text-sm text-gray-300">{getTimeRange()}</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
                            <span>Next</span>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default BookingTemplateDark;
