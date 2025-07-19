let day = document.querySelector('.day'); let dotInterval;
const dayVariants = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"]

function startLoadingText() {
    let dots = ".";
    dotInterval = setInterval(() => {
        dots = dots.length >= 3 ? "." : dots + ".";
        day.textContent = dots;
    }, 500);
}

function stopLoadingText(newText) {
    clearInterval(dotInterval);
    day.textContent = newText;
}
async function gettimeprayer() {
    try {
        const url = new URL("https://api.aladhan.com/v1/timingsByCity");
        url.searchParams.set("country", "africa");
        url.searchParams.set("city", "tripoli");
        url.searchParams.set("method", "8");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.date.hijri.weekday.ar;

    } catch (error) {
        console.error("حدث خطأ في جلب مواقيت الصلاة:", error);
    }

}
async function todayisnot() {
    startLoadingText();
    let day = notday = await getday();
    while (day == notday) {
        notday = dayVariants[Math.floor(Math.random() * 7)]
    }
    stopLoadingText(notday);




}
async function getday() {
    return gettimeprayer();
}
todayisnot()
