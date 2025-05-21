export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}`;
};

export function getLast30Days() {
    const dates = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(formatDate(d));
    }

    return dates;
};

export function getLast30DaysISO() {
    const dates = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
    }

    return dates;
};

export function getFirstDayOfLast30() {
    const dates = getLast30DaysISO();
    return dates[0];
}

export function getLastDayOfLast30() {
    const dates = getLast30DaysISO();
    return dates[dates.length - 1];
}