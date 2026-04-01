import { createContext, useContext, useEffect, useState } from "react";

const TurfContext = createContext();

export const useTurfContext = () => {
    return useContext(TurfContext);
};

export const TurfProvider = ({ children }) => {
    // Shared State for the currently selected Turf
    const [currentTurf, setCurrentTurf] = useState(() => {
        const savedTurf = localStorage.getItem("currentTurfContext");
        return savedTurf ? JSON.parse(savedTurf) : null;
    });

    // Shared State for ongoing Booking Data (useful for Payment page)
    const [bookingData, setBookingData] = useState(() => {
        const savedBooking = localStorage.getItem("currentBookingContext");
        return savedBooking ? JSON.parse(savedBooking) : null;
    });

    // Update localStorage whenever Context states change
    useEffect(() => {
        if (currentTurf) {
            localStorage.setItem("currentTurfContext", JSON.stringify(currentTurf));
        } else {
            localStorage.removeItem("currentTurfContext");
        }
    }, [currentTurf]);

    useEffect(() => {
        if (bookingData) {
            localStorage.setItem("currentBookingContext", JSON.stringify(bookingData));
        } else {
            localStorage.removeItem("currentBookingContext");
        }
    }, [bookingData]);

    const setTurf = (turfData) => {
        setCurrentTurf(turfData);
    };

    const clearTurf = () => {
        setCurrentTurf(null);
    };

    const setBooking = (data) => {
        setBookingData(data);
    };

    const clearBooking = () => {
        setBookingData(null);
    };

    return (
        <TurfContext.Provider
            value={{
                currentTurf,
                setTurf,
                clearTurf,
                bookingData,
                setBooking,
                clearBooking,
            }}
        >
            {children}
        </TurfContext.Provider>
    );
};
