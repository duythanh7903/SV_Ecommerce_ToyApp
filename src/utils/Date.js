const addLeadingZero = (number) => { return number < 10 ? `0${number}` : `${number}` }

const getTimeNow = () => {
    const now = new Date();

    const currentYear = now.getFullYear(); // Lấy ra năm hiện tại
    const currentMonth = addLeadingZero(now.getMonth() + 1); // Lấy ra tháng hiện tại và thêm số 0 nếu cần
    const currentDate = addLeadingZero(now.getDate()); // Lấy ra ngày hiện tại và thêm số 0 nếu cần
    const currentHour = addLeadingZero(now.getHours()); // Lấy ra giờ hiện tại và thêm số 0 nếu cần
    const currentMinute = addLeadingZero(now.getMinutes()); // Lấy ra phút hiện tại và thêm số 0 nếu cần
    const currentSecond = addLeadingZero(now.getSeconds()); // Lấy ra giây hiện tại và thêm số 0 nếu cần

    return `${currentDate}/${currentMonth}/${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`
}

const DateTime = {
    getTimeNow
}

export default DateTime