


function initDashboard() {

const appointmentBody = document.getElementById("appointmentBody");

// Get data from localStorage
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];


// Render function
function renderAppointments(appointments) {
    appointmentBody.innerHTML = "";
     if (!appointments || appointments.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.classList.add("no-appointments");
        emptyMsg.innerText = "No appointments found!";
        appointmentBody.appendChild(emptyMsg);
        return;
    }
    appointments.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("appointment-row");

        row.innerHTML = `
            <div class="link">${item.name}</div>
            <div class="link">${item.doctor}</div>
            <div>${item.hospital}</div>
            <div>${item.specialist}</div>
            <div>${item.date}</div>
            <div class="time">${item.time}</div>
            
            <div class="action-icons">
                <!-- Edit -->
                
                    <svg onclick="editAppointment(${index})" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 16.25H18.75V17.5H1.25V16.25ZM15.875 5.625C16.375 5.125 16.375 4.375 15.875 3.875L13.625 1.625C13.125 1.125 12.375 1.125 11.875 1.625L2.5 11V15H6.5L15.875 5.625ZM12.75 2.5L15 4.75L13.125 6.625L10.875 4.375L12.75 2.5ZM3.75 13.75V11.5L10 5.25L12.25 7.5L6 13.75H3.75Z" fill="#2C7BE5"/>
                    </svg>

                <!-- Delete -->
               
                <svg onclick="deleteAppointment(${index})" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#E23D28"/>
                </svg>

            </div>
        `;

        appointmentBody.appendChild(row);
    });
}
function filterAppointments() {
    const patientValue = document.getElementById("patientSearch").value.toLowerCase();
    const doctorValue = document.getElementById("doctorSearch").value.toLowerCase();
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    let filtered = appointments.filter(item => {

        let matchPatient = !patientValue || item.name.toLowerCase().includes(patientValue);
        let matchDoctor = !doctorValue || item.doctor.toLowerCase().includes(doctorValue);

        let matchFromDate = !fromDate || new Date(item.date) >= new Date(fromDate);
     

        return matchPatient && matchDoctor && matchFromDate 
    });

    renderAppointments(filtered); 
}

document.querySelectorAll(".dash-navbar input").forEach(input => {
    input.addEventListener("input", filterAppointments);
});

document.querySelector(".update-btn").addEventListener("click", filterAppointments);

renderAppointments(appointments);












}

window.deleteAppointment = function(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));
    initCalendar();
    initDashboard(); 
    
    showToast("Appointment deleted", "success");
};

let editIndex = null;

window.editAppointment = function(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const item = appointments[index];

    if (!item) {
        console.error("Invalid appointment index ");
        return;
    }

    window.editIndex = index;
    console.log(editIndex);

    document.getElementById("modalOverlay")?.remove();

    
    fetch("components/appointment.html")
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);

            
            setAppointment();

            const nameInput = document.getElementById("patientName");
            const doctorBtn = document.querySelector(".doctor-dropdown-btn");
            const hospitalBtn = document.querySelector(".hospital-dropdown");
            const specialistBtn = document.querySelector(".specialist-dropdown");
            const dateInput = document.getElementById("appDate");
            const timeInput = document.getElementById("appTime");
            const reasonInput = document.getElementById("appReason");

            if (nameInput) nameInput.value = item.name;
            if (doctorBtn) doctorBtn.innerText = item.doctor;
            if (hospitalBtn) hospitalBtn.innerText = item.hospital;
            if (specialistBtn) specialistBtn.innerText = item.specialist;
            if (dateInput) dateInput.value = item.date;
            if (timeInput) timeInput.value = convertTo24(item.time);
            if (reasonInput) reasonInput.value = item.reason;
        })
        .catch(err => console.error("Edit fetch error:", err));
};

