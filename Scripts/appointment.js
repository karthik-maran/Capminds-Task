
function setAppointment(){




const doctorButton = document.querySelector(".doctor-dropdown-btn");
const dropdown = document.querySelector(".doc-dropdown"); 
const doctItems = document.querySelectorAll(".doc-dropdown-menu div");


doctorButton?.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});


doctItems.forEach(item => {
    item.addEventListener("click", function () {
        doctorButton.innerHTML = this.innerText + " <span></span>";
        dropdown.classList.remove("active");
    });
});


const hospitalButton = document.querySelector(".hospital-dropdown");
const hosDropdown = document.querySelector(".hos-dropdown");
const hosItems = document.querySelectorAll(".hos-dropdown-menu div");

hospitalButton?.addEventListener('click', ()=>{
    hosDropdown.classList.toggle('active');
    
});

hosItems.forEach(Item =>{
    Item.addEventListener('click', function(){
        hospitalButton.innerHTML = this.innerHTML+" <span></span>";
        hosDropdown.classList.remove("active");
    })
});

const specialistButton =document.querySelector(".specialist-dropdown")
const specialDropdown = document.querySelector(".special-dropdown")
const specItems = document.querySelectorAll(".special-dropdown-menu div")

specialistButton?.addEventListener('click', ()=>{
    specialDropdown.classList.toggle('active');
});

specItems.forEach(Item =>{
    Item.addEventListener('click', function(){
        specialistButton.innerHTML = this.innerHTML+" <span></span>";
        specialDropdown.classList.remove('active');
    })
    
})


const closeIcon = document.querySelector(".close");
const closeBtn = document.querySelector(".app-close");

// Close when clicking X
closeIcon.addEventListener("click", () => {
    const overlay = document.getElementById("modalOverlay");
    overlay?.remove();
    initCalendar();
});

// Close when clicking button
closeBtn.addEventListener("click", () => {
    const overlay = document.getElementById("modalOverlay");
    overlay?.remove();
    initCalendar();
});


document.addEventListener("click", (e) => {

    if (e.target.closest(".close") || e.target.closest(".app-close")) {
        document.getElementById("modalOverlay")?.remove();
    }

    if (e.target.id === "modalOverlay") {
        e.target.remove();
    }

});



document.addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") {
        e.target.remove();
    }
});


  

const submitBtn = document.querySelector(".app-submit");

submitBtn.onclick = function(e) {
    e.preventDefault();

    console.log("submit clicked");
    if (!validateAppointmentForm()) return;
    const name = document.getElementById("patientName").value;
    const doctor = document.querySelector(".doctor-dropdown-btn").innerText;
    const hospital = document.querySelector(".hospital-dropdown").innerText;
    const specialist = document.querySelector(".specialist-dropdown").innerText;
    const date = document.getElementById("appDate").value;
    const rawTime = document.getElementById("appTime").value;
    const reason = document.getElementById("appReason").value;

    function formatTimeToAMPM(time) {
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);

        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    }

    const time = formatTimeToAMPM(rawTime);

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const appointmentData = {
        id: editIndex !== null 
            ? appointments[editIndex].id 
            : Date.now(),
        name,
        doctor,
        hospital,
        specialist,
        date,
        time,
        reason
    };

    if (editIndex !== null) {
        
        appointments[editIndex] = appointmentData;
        editIndex = null;
    } else {
        
        appointments.push(appointmentData);
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("modalOverlay")?.remove();
    initCalendar();
    initDashboard();

  
   

    showToast("Appointment Saved", "success");
};


}


// validation

function validateAppointmentForm() {
    const name = document.getElementById("patientName").value.trim();
    const doctor = document.querySelector(".doctor-dropdown-btn").innerText.trim();
    const hospital = document.querySelector(".hospital-dropdown").innerText.trim();
    const specialist = document.querySelector(".specialist-dropdown").innerText.trim();
    const date = document.getElementById("appDate").value;
    const time = document.getElementById("appTime").value;
    const reason = document.getElementById("appReason").value.trim();

    clearErrors();

    let isValid = true;

    if (!name) {
        showError("patientName", "Name is required");
        isValid = false;
    }

    if (doctor === "Select Doctor") {
        showError("doctorError", "Select a doctor");
        isValid = false;
    }

    if (hospital === "Select Hospital") {
        showError("hospitalError", "Select a hospital");
        isValid = false;
    }

    if (specialist === "Select Specialist") {
        showError("specialistError", "Select a specialist");
        isValid = false;
    }

    if (!date) {
        showError("appDate", "Date is required");
        isValid = false;
    }

    if (!time) {
        showError("appTime", "Time is required");
        isValid = false;
    }


    return isValid;
}
// Toast Fucntion

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
// Error Display function
function showError(fieldId, message) {
    let field = document.getElementById(fieldId);

    if (field) {
        field.style.border = "1px solid red";
        
        let error = document.createElement("div");
        error.className = "error-text";
        error.innerText = message;

        field.parentNode.appendChild(error);
    }
}
//remove erros 

function clearErrors() {
    document.querySelectorAll(".error-text").forEach(el => el.remove());
    document.querySelectorAll("input, textarea").forEach(el => {
        el.style.border = "";
    });
}