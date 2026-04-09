let currentDate = new Date();

function initCalendar() {

    let dates = document.getElementById("dates");


dates.replaceWith(dates.cloneNode(true));


dates = document.getElementById("dates");
    const curDate = document.getElementById("curDate");

    // ================= CALENDAR RENDER =================
    function renderCalendar() {
        dates.innerHTML = "";

        const monthNames = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();

        let firstDay = new Date(year, month, 1).getDay();
        let totalDays = new Date(year, month + 1, 0).getDate();
        let prevDays = new Date(year, month, 0).getDate();

        // previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            dates.innerHTML += `<div class="fade">${prevDays - i}</div>`;
        }

        // current month days
        for (let i = 1; i <= totalDays; i++) {

            const fullDate = `${year}-${(month + 1)
                .toString()
                .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

            if (i === 1) {
                dates.innerHTML += `
                    <div class="day" data-date="${fullDate}">
                        ${monthNames[month].slice(0, 3)} ${i}
                    </div>`;
            } else {
                dates.innerHTML += `
                    <div class="day" data-date="${fullDate}">
                        ${i}
                    </div>`;
            }
        }

     
        let totalCells = dates.children.length;
        let remainingCells = (7 - (totalCells % 7)) % 7;

        for (let i = 1; i <= remainingCells; i++) {
            dates.innerHTML += `<div class="fade">${i}</div>`;
        }
    }

    // ================= APPOINTMENTS =================
    function renderAppointments() {

        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();

        const allDays = document.querySelectorAll(".day");

        allDays.forEach(dayDiv => {

            let text = dayDiv.innerText.trim();

            let dayNumber = text.includes(" ")
                ? parseInt(text.split(" ")[1])
                : parseInt(text);

            appointments.forEach((app, index) => {

                const appDate = new Date(app.date);

                if (
                    appDate.getFullYear() === year &&
                    appDate.getMonth() === month &&
                    appDate.getDate() === dayNumber
                ) {

                    const box = document.createElement("div");
                    box.classList.add("appointment-card");

               
                    box.dataset.index = index;

                    box.innerHTML = `
                        <div class="card-left">
                            <div class="card-text">
                                <div class="name">${app.name}</div>
                                <div class="docName">${app.doctor}</div>
                            </div>
                        </div>

                        <div class="card-right">
                            <div class="caltime">${app.time}</div>

                            <div class="card-actions">
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="edit-icon">
                                <path d="M3.33333 11.8751H4.276L10.4853 6.0538L9.54267 5.17005L3.33333 10.9913V11.8751ZM14 13.1251H2V10.4732L10.9567 2.0763C11.0817 1.95913 11.2512 1.89331 11.428 1.89331C11.6048 1.89331 11.7743 1.95913 11.8993 2.0763L13.7853 3.84443C13.9103 3.96163 13.9805 4.12057 13.9805 4.2863C13.9805 4.45203 13.9103 4.61097 13.7853 4.72818L6.162 11.8751H14V13.1251ZM10.4853 4.2863L11.428 5.17005L12.3707 4.2863L11.428 3.40255L10.4853 4.2863Z" fill="#2E2E2E" fill-opacity="0.9"/>
                                </svg>

                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="delete-icon">
                                        <path d="M4.66669 13.125C4.30002 13.125 3.98624 13.0027 3.72535 12.7581C3.46402 12.5131 3.33335 12.2188 3.33335 11.875V3.75C3.14446 3.75 2.98602 3.69021 2.85802 3.57062C2.73046 3.45062 2.66669 3.30208 2.66669 3.125C2.66669 2.94792 2.73046 2.79938 2.85802 2.67938C2.98602 2.55979 3.14446 2.5 3.33335 2.5H6.00002C6.00002 2.32292 6.06402 2.17437 6.19202 2.05437C6.31958 1.93479 6.4778 1.875 6.66669 1.875H9.33335C9.52224 1.875 9.68069 1.93479 9.80869 2.05437C9.93624 2.17437 10 2.32292 10 2.5H12.6667C12.8556 2.5 13.0138 2.55979 13.1414 2.67938C13.2694 2.79938 13.3334 2.94792 13.3334 3.125C13.3334 3.30208 13.2694 3.45062 13.1414 3.57062C13.0138 3.69021 12.8556 3.75 12.6667 3.75V11.875C12.6667 12.2188 12.5362 12.5131 12.2754 12.7581C12.014 13.0027 11.7 13.125 11.3334 13.125H4.66669ZM4.66669 3.75V11.875H11.3334V3.75H4.66669ZM6.00002 10C6.00002 10.1771 6.06402 10.3254 6.19202 10.445C6.31958 10.565 6.4778 10.625 6.66669 10.625C6.85558 10.625 7.01402 10.565 7.14202 10.445C7.26958 10.3254 7.33335 10.1771 7.33335 10V5.625C7.33335 5.44792 7.26958 5.29937 7.14202 5.17937C7.01402 5.05979 6.85558 5 6.66669 5C6.4778 5 6.31958 5.05979 6.19202 5.17937C6.06402 5.29937 6.00002 5.44792 6.00002 5.625V10ZM8.66669 10C8.66669 10.1771 8.73069 10.3254 8.85869 10.445C8.98624 10.565 9.14447 10.625 9.33335 10.625C9.52224 10.625 9.68069 10.565 9.80869 10.445C9.93624 10.3254 10 10.1771 10 10V5.625C10 5.44792 9.93624 5.29937 9.80869 5.17937C9.68069 5.05979 9.52224 5 9.33335 5C9.14447 5 8.98624 5.05979 8.85869 5.17937C8.73069 5.29937 8.66669 5.44792 8.66669 5.625V10Z" fill="#2E2E2E" fill-opacity="0.9"/>
                                </svg>

                            </div>
                        </div>
                    `;

                    dayDiv.appendChild(box);
                }
            });
        });
    }

    // ================= DATE DISPLAY =================
    function displayCurrentDate() {
        const monthNames = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        curDate.innerText =
            monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
    }

    // ================= BUTTONS =================
    const prevBtn = document.querySelector(".previous-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
            displayCurrentDate();
            renderAppointments();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
            displayCurrentDate();
            renderAppointments();
        });
    }

    // ================= CLICK HANDLER =================
    dates.addEventListener("click", (e) => {

        // 🗑 DELETE
        const deleteBtn = e.target.closest(".delete-icon");
        if (deleteBtn) {
            e.stopPropagation();

            const card = deleteBtn.closest(".appointment-card");
            const index = card.dataset.index;

            deleteAppointment(index);
            return;
        }


        const day = e.target.closest(".day");
        if (!day) return;

        const selectedDate = day.dataset.date;

        openAppointmentByDate(selectedDate);
    });

    // ================= INIT =================
    renderCalendar();
    renderAppointments();
    displayCurrentDate();

    console.log("calendar loaded");
}


// ================= OPEN MODAL =================
function openAppointmentByDate(selectedDate) {

    document.getElementById("modalOverlay")?.remove();

    fetch("components/appointment.html")
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

            setAppointment();

            const dateInput = document.getElementById("appDate");

            if (dateInput) {
                dateInput.value = selectedDate;
            }
        })
        .catch(err => console.error("Modal fetch error:", err));
}


// ================= DELETE FUNCTION =================
window.deleteAppointment = function(index) {

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    if (typeof initCalendar === "function") initCalendar();
    if (typeof initDashboard === "function") initDashboard();

    showToast("Appointment deleted", "success");
};


// ================= INIT CALL =================
document.addEventListener("DOMContentLoaded", () => {
    initCalendar();
});

function loadCalendarPage() {
    document.getElementById("main").innerHTML = calendarHTML;

    initCalendar(); 
}