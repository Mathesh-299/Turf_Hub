export default function computeTimeRangeAndDuration(slots, parseTimeString) {
    if (!slots.length) return { timeRange: "", timeDuration: "" };
    const sortedSlots = [...slots].sort((a, b) =>
        parseTimeString(a) - parseTimeString(b))
    const startTime = parseTimeString(sortedSlots[0]);
    const lastSlotTime = parseTimeString(sortedSlots[sortedSlots.length - 1]);
    const endTime = lastSlotTime + 30;

    const fmtTime = mins => {
        let h = Math.floor(mins / 60);
        const m = mins % 60;
        const mer = h >= 12 ? "PM" : "AM";
        h = h % 12 == 0 ? 12 : h % 12;
        return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
    }

    const timeRange = `${fmtTime(startTime)} - ${fmtTime(endTime)}`;

    const durationMins = endTime - startTime;
    const hr = Math.floor(durationMins / 60);
    const min = durationMins % 60;
    const timeDuration = hr && min ? `${hr} hr ${min} min` :
        hr ? `${hr} hr` :
            `${min} min`;

    return { timeRange, timeDuration }
};
