import { useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuCloudSun, LuMoon, LuSun, LuSunrise } from "react-icons/lu";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";

const BookingTemplateDark = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeOfDay, setTimeOfDay] = useState("Evening");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookingData, setBookingData] = useState(null);

    const { state } = useLocation();
    const { turf } = state || {};
    const turfPricePerHour = turf?.price ?? 0;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const periods = [
        { label: "Twilight", icon: LuMoon },
        { label: "Morning", icon: LuSunrise },
        { label: "Noon", icon: LuSun },
        { label: "Evening", icon: LuCloudSun }
    ];

    function getStartOfWeek(date) {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
    }

    const getDatesForWeek = () =>
        [...Array(7)].map((_, i) => {
            const d = new Date(currentWeekStart);
            d.setDate(currentWeekStart.getDate() + i);
            return d;
        });

    const generateSlots = period => {
        let startHour = 0, endHour = 24;
        if (period === "Twilight") [startHour, endHour] = [0, 6];
        if (period === "Morning") [startHour, endHour] = [6, 12];
        if (period === "Noon") [startHour, endHour] = [12, 18];
        if (period === "Evening") [startHour, endHour] = [18, 24];

        const slots = [];
        for (let h = startHour; h < endHour; h++) {
            slots.push(`${h % 12 === 0 ? 12 : h % 12}:00 ${h < 12 ? "am" : "pm"}`);
            slots.push(`${h % 12 === 0 ? 12 : h % 12}:30 ${h < 12 ? "am" : "pm"}`);
        }
        return slots;
    };

    const slots = generateSlots(timeOfDay);

    const parseTime = t => {
        const [tm, mer] = t.split(" ");
        let [h, m] = tm.split(":").map(Number);
        if (mer === "pm" && h !== 12) h += 12;
        if (mer === "am" && h === 12) h = 0;
        return h * 60 + m;
    };
    const fmtTime = mins => {
        let h = Math.floor(mins / 60);
        const m = mins % 60;
        const mer = h >= 12 ? "PM" : "AM";
        h = h % 12 === 0 ? 12 : h % 12;
        return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
    };

    const getTimeRangeAndDuration = () => {
        if (!selectedSlots.length) return { range: "", duration: "" };
        const sorted = [...selectedSlots].sort((a, b) => parseTime(a) - parseTime(b));
        const start = parseTime(sorted[0]);
        const end = parseTime(sorted.at(-1)) + 30;

        const hrs = Math.floor((end - start) / 60);
        const mins = (end - start) % 60;
        return {
            range: `${fmtTime(start)} – ${fmtTime(end)}`,
            duration: `${hrs ? `${hrs} hr${hrs > 1 ? "s" : ""} ` : ""}${mins ? `${mins} min${mins > 1 ? "s" : ""}` : ""}`
        };
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

    const toggleSlot = slot =>
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot].sort((a, b) => parseTime(a) - parseTime(b))
        );

    const totalPrice = (selectedSlots.length * turfPricePerHour) / 2;

    const handleBookSubmit = () => {
        if (!selectedSlots.length) {
            toast.warn("Choose at least one slot.");
            return;
        }
        const { range, duration } = getTimeRangeAndDuration();
        setBookingData({
            userName: user?.name,
            date: selectedDate.toISOString().split("T")[0],
            session: timeOfDay,
            timeRange: range,
            timeDuration: duration,
            totalPrice: totalPrice.toLocaleString()
        });

    };

    useEffect(() => {
        if (bookingData) console.log("Booking Data →", bookingData);
    }, [bookingData]);

    return (
        <main className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center pt-24 pb-36 sm:pt-32 gap-6 px-2">
            <h1 className="text-2xl font-bold text-center">{turf?.name}</h1>
            <hr className="border-white w-full max-w-2xl" />
            <section className="flex items-center justify-center gap-2 w-full max-w-3xl overflow-x-auto scrollbar-hide px-1">
                <button onClick={handlePrevWeek} disabled={currentWeekStart <= getStartOfWeek(new Date())}
                    className={`p-2 rounded-full shrink-0 ${currentWeekStart <= getStartOfWeek(new Date())
                        ? "bg-neutral-700 opacity-40 cursor-not-allowed"
                        : "bg-neutral-800 hover:bg-neutral-700"}`}>
                    <FaChevronLeft />
                </button>
                {getDatesForWeek().map(d => {
                    const today = new Date(); today.setHours(0, 0, 0, 0);
                    const past = d < today;
                    const sel = d.toDateString() === selectedDate.toDateString();
                    return (
                        <button key={d} disabled={past} onClick={() => !past && setSelectedDate(d)}
                            className={`flex flex-col items-center min-w-[3.6rem] px-2 py-2 rounded-lg text-xs transition
                ${sel ? "bg-purple-700 border-2 font-semibold" : "bg-neutral-800 hover:bg-neutral-700"}
                ${past && "opacity-40 cursor-not-allowed"}`}>
                            <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                            <span className="text-sm">{d.getDate()} {d.toLocaleDateString("en-US", { month: "short" })}</span>
                        </button>
                    );
                })}
                <button onClick={handleNextWeek}
                    className="p-2 rounded-full shrink-0 bg-neutral-800 hover:bg-neutral-700">
                    <FaChevronRight />
                </button>
            </section>
            <hr className="border-white w-full max-w-2xl" />
            <section className="flex flex-wrap justify-center gap-2 w-full px-1 max-w-3xl">
                {periods.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => { setTimeOfDay(label); setSelectedSlots([]); }}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full transition text-sm
                ${timeOfDay === label ? "bg-purple-700 border-2 font-semibold"
                                : "bg-neutral-800 hover:bg-neutral-700"}`}>
                        <Icon className="shrink-0" /> <span>{label}</span>
                    </button>
                ))}
            </section>
            <hr className="border-white w-full max-w-2xl" />
            <section className="grid gap-2 w-full max-w-lg px-1"
                style={{ gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))" }}>
                {slots.map(slot => (
                    <div key={slot} onClick={() => toggleSlot(slot)}
                        className={`text-center py-2 rounded-full text-xs sm:text-sm cursor-pointer transition ${selectedSlots.includes(slot)
                            ? "bg-purple-700 border-2 font-semibold hover:bg-blue-500"
                            : "bg-neutral-800 hover:bg-neutral-700"}`}>
                        {slot}
                    </div>
                ))}
            </section>
            <hr className="border-white w-full max-w-2xl" />
            {selectedSlots.length > 0 && (
                <section
                    className="fixed bottom-0 left-0 right-0 sm:static sm:max-w-2xl sm:rounded-lg bg-green-600 text-white p-4 flex flex-col sm:flex-row items-center
                    justify-between gap-4 mx-auto">
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-bold">₹ {totalPrice.toLocaleString()}</p>
                        {(() => {
                            const { range, duration } = getTimeRangeAndDuration();
                            return (
                                <>
                                    <p className="text-sm text-gray-300">{range}</p>
                                    <p className="text-sm text-yellow-400">{duration}</p>
                                </>
                            );
                        })()}
                    </div>
                    <Link to="/paymentDetails" state={{ totalPrice: totalPrice.toLocaleString() }}>
                        <button onClick={handleBookSubmit}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold">
                            Next <FaArrowRight />
                        </button>
                    </Link>
                </section>
            )
            }
        </main >
    );
};

export default BookingTemplateDark;
