

const sliderBtn = document.querySelector(".slider-icon-box");
const slidebar = document.getElementById("sidebar")


sliderBtn.addEventListener("click",()=>{
  
    slidebar.classList.toggle("collapsed");
});



document.addEventListener("DOMContentLoaded", () => {
    loadCalendar().then(() => {
        isCalendarLoaded = true;
    });
});
function loadCalendar() {
    return fetch("components/calender.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("calendar-container").innerHTML = data;

         
            initCalendar();
        });
}


function loadDashboard() {
    fetch("components/dashboard.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("dashboard-container").innerHTML = data;
            initDashboard();
        });
}


const bookBtn = document.querySelector(".book-btn");

bookBtn.addEventListener("click", () => {


    document.getElementById("modalOverlay")?.remove();

    fetch("components/appointment.html")
        .then(res => res.text())
        .then(data => {

            
            document.body.insertAdjacentHTML("beforeend", data);
            setAppointment();

            
         
        })
        .catch(err => console.error(err));
});

let isCalendarLoaded = false;

document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;

        if (page === "calendar") {
            document.getElementById("calendar-container").style.display = "block";
            document.getElementById("dashboard-container").style.display = "none";

            
            if (!isCalendarLoaded) {
                loadCalendar();
                
                isCalendarLoaded = true;
            }
        }

        if (page === "dashboard") {
            document.getElementById("calendar-container").style.display = "none";
            document.getElementById("dashboard-container").style.display = "block";

            loadDashboard();
        }
    });
});

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {

        // remove active from all
        menuItems.forEach(i => i.classList.remove("active"));

        // add active to clicked one
        item.classList.add("active");

        // ✅ store active tab (important for refresh)
        localStorage.setItem("activeMenu", index);
    });
});