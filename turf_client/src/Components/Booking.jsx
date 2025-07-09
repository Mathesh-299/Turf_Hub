import { useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuCloudSun, LuMoon, LuSun, LuSunrise } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../api/api";
import computeTimeRangeAndDuration from "../utils/computeTimeRangeAndDuration";

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getStartOfWeek(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() - d.getDay());
    return d;
}

function formatSlotTime(h, m) {
    const mer = h >= 12 ? "PM" : "AM";
    h = h % 12 === 0 ? 12 : h % 12;
    return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
}

const BookingTemplateDark = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeOfDay, setTimeOfDay] = useState("Evening");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookedSlotStrings, setBookedSlotStrings] = useState([]);
    const location = useLocation();
    const turf =  location.state;
    // console.log(turf)
    const turfPricePerHour = turf?.price ?? 0;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    const periods = [
        { label: "Twilight", icon: LuMoon },
        { label: "Morning", icon: LuSunrise },
        { label: "Noon", icon: LuSun },
        { label: "Evening", icon: LuCloudSun }
    ];
    console.log(turf)

    const getDatesForWeek = () => [...Array(7)].map((_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(currentWeekStart.getDate() + i);
        return d;
    });

    const generateSlots = (period) => {
        let startHour = 0, endHour = 24;
        if (period === "Twilight") [startHour, endHour] = [0, 6];
        if (period === "Morning") [startHour, endHour] = [6, 12];
        if (period === "Noon") [startHour, endHour] = [12, 18];
        if (period === "Evening") [startHour, endHour] = [18, 24];

        const slots = [];
        for (let h = startHour; h < endHour; h++) {
            slots.push(formatSlotTime(h, 0));
            slots.push(formatSlotTime(h, 30));
        }
        return slots;
    };

    const parseTimeString = (str) => {
        const [time, mer] = str.trim().split(" ");
        let [h, m] = time.split(":").map(Number);
        if (mer.toUpperCase() === "PM" && h !== 12) h += 12;
        if (mer.toUpperCase() === "AM" && h === 12) h = 0;
        return h * 60 + m;
    };

    const fmtTime = (mins) => {
        let h = Math.floor(mins / 60);
        const m = mins % 60;
        const mer = h >= 12 ? "PM" : "AM";
        h = h % 12 === 0 ? 12 : h % 12;
        return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
    };

    const expandBookedRanges = (ranges) => {
        const expanded = [];
        ranges.forEach(rangeStr => {
            const [startStr, endStr] = rangeStr.split(/\s*[-–—]\s*/).map(s => s.trim());
            let start = parseTimeString(startStr);
            const end = parseTimeString(endStr);
            while (start < end) {
                expanded.push(fmtTime(start));
                start += 30;
            }
        });
        return expanded;
    };

    const handlePrevWeek = () => {
        const prev = new Date(currentWeekStart);
        prev.setDate(prev.getDate() - 7);
        if (prev >= getStartOfWeek(new Date())) {
            setCurrentWeekStart(prev);
            setSelectedDate(prev);
        }
    };

    const handleNextWeek = () => {
        const next = new Date(currentWeekStart);
        next.setDate(next.getDate() + 7);
        setCurrentWeekStart(next);
        setSelectedDate(next);
    };

    const toggleSlot = (slot) => {
        const dateKey = `${getLocalDateString(selectedDate)}_${timeOfDay}_${slot}`;
        if (bookedSlotStrings.includes(dateKey)) return;
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot].sort((a, b) => parseTimeString(a) - parseTimeString(b))
        );
    };

    const totalPrice = (selectedSlots.length * turfPricePerHour) / 2;

    const handleBookSubmit = () => {
        if (!selectedSlots.length) {
            toast.warn("Choose at least one slot.");
            return;
        }
        const { timeRange, timeDuration } = computeTimeRangeAndDuration(selectedSlots, parseTimeString);
        const bookingPayload = {
            userName: user?.name,
            date: getLocalDateString(selectedDate),
            session: timeOfDay,
            timeRange,
            timeDuration,
            totalPrice: totalPrice
        };
        navigate("/paymentDetails", { state: { bookingData: bookingPayload, turf } });
    };

    const fetchAvailable = async () => {
        if (!turf?._id || !selectedDate || !timeOfDay) return;
        const dateStr = getLocalDateString(selectedDate);
        console.log(dateStr)
        const token = localStorage.getItem("token");
        try {
            const response = await API.get(`/booking/getSlots/${turf._id}/${dateStr}/${timeOfDay}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const bookedSlotsData = response.data.bookedSlots || [];
            const expandedKeys = bookedSlotsData.flatMap(slot => {
                const times = expandBookedRanges([slot.timeRange]);
                return times.map(time => `${slot.date}_${slot.session}_${time}`);
            });
            const filteredKeys = expandedKeys.filter(key => key.startsWith(`${dateStr}_${timeOfDay}_`));
            setBookedSlotStrings(filteredKeys);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch available slots.");
        }
    };

    useEffect(() => {
        fetchAvailable();
    }, [selectedDate, timeOfDay, turf?._id]);

    const slots = generateSlots(timeOfDay);
    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center pt-24 pb-36 sm:pt-32 gap-6 px-2">
            <h1 className="text-2xl font-bold text-center">{turf?.name}</h1>
            <hr className="border-white w-full max-w-2xl" />
            <section className="flex items-center justify-center gap-2 w-full max-w-3xl overflow-x-auto scrollbar-hide">
                <button onClick={handlePrevWeek} disabled={currentWeekStart <= getStartOfWeek(new Date())}
                    className={`p-2 rounded-full ${currentWeekStart <= getStartOfWeek(new Date())
                        ? "bg-neutral-700 opacity-40 cursor-not-allowed"
                        : "bg-neutral-800 hover:bg-neutral-700"}`}>
                    <FaChevronLeft />
                </button>
                {getDatesForWeek().map(d => {
                    const today = new Date(); today.setHours(0, 0, 0, 0);
                    const past = d < today;
                    const sel = d.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={d.toISOString()}
                            disabled={past}
                            onClick={() => {
                                if (!past) {
                                    console.log(d.getMonth());
                                    setSelectedDate(d);
                                }
                            }}
                            className={`flex flex-col items-center min-w-[3.6rem] px-2 py-2 rounded-lg
                            ${sel ? "bg-purple-700 font-semibold" : "bg-neutral-800 hover:bg-neutral-700"}
                            ${past && "opacity-40 cursor-not-allowed"}`}>
                            <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                            <span className="text-sm">{d.getDate()} {d.toLocaleDateString("en-US", { month: "short" })}</span>
                        </button>
                    );
                })}
                <button onClick={handleNextWeek}
                    className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <FaChevronRight />
                </button>
            </section>
            <hr className="border-white w-full max-w-2xl" />

            <section className="flex flex-wrap justify-center gap-2 max-w-3xl">
                {periods.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => { setTimeOfDay(label); setSelectedSlots([]); }}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full
                            ${timeOfDay === label ? "bg-purple-700 font-semibold" : "bg-neutral-800 hover:bg-neutral-700"}`}>
                        <Icon /> {label}
                    </button>
                ))}
            </section>
            <hr className="border-white w-full max-w-2xl" />

            <section className="grid gap-2 w-full max-w-lg"
                style={{ gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))" }}>
                {slots.map(slot => {
                    const key = `${getLocalDateString(selectedDate)}_${timeOfDay}_${slot}`;
                    const isBooked = bookedSlotStrings.includes(key);
                    const isSelected = selectedSlots.includes(slot);
                    return (
                        <div key={slot}
                            onClick={() => toggleSlot(slot)}
                            title={isBooked ? "Already booked" : ""}
                            className={`text-center py-2 rounded-full cursor-pointer
                                ${isBooked
                                    ? "bg-gray-700 text-black opacity-50 disabled"
                                    : isSelected
                                        ? "bg-purple-700 font-semibold"
                                        : "bg-neutral-800 hover:bg-neutral-700"}`}>
                            {slot}
                        </div>
                    );
                })}
            </section>

            {selectedSlots.length > 0 && (
                <section className="fixed bottom-0 left-0 right-0 bg-purple-600 p-4 flex justify-between gap-10 items-center sm:static sm:rounded-lg sm:max-w-xl">
                    <div>
                        <p className="text-lg font-bold">₹ {totalPrice.toLocaleString()}</p>
                        <p className="text-sm text-yellow-300">{selectedSlots.join(", ")}</p>
                    </div>
                    <button onClick={handleBookSubmit}
                        className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-600 hover:text-white font-bold px-4 py-2 rounded-full">
                        Next <FaArrowRight />
                    </button>
                </section>
            )}
        </div>
    );
};

export default BookingTemplateDark;
