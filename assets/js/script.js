// Script to handle time filter buttons toggling
const filterButtons = document.querySelectorAll('.time-filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.tabIndex = 0;
  });
});

// Optional: Dot navigation highlight on listings cards (simulate carousel dots active state)
const dotsSets = document.querySelectorAll('.listing-dots');
dotsSets.forEach(dotSet => {
  const dots = dotSet.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("salesChart").getContext("2d");

  // Function to calculate responsive options
  const getResponsiveOptions = () => {
    const screenWidth = window.innerWidth;

    let fontSize = 14;
    let barThickness = 40;

    if (screenWidth < 480) {
      fontSize = 10;
      barThickness = 20;
    } else if (screenWidth < 768) {
      fontSize = 12;
      barThickness = 30;
    } else if (screenWidth < 1200) {
      fontSize = 13;
      barThickness = 35;
    }

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: fontSize
            }
          }
        },
        title: {
          display: true,
          // text: "Sales Performance (2025)",
          font: {
            size: fontSize + 2
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: fontSize
            }
          },
          barThickness: barThickness
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            font: {
              size: fontSize
            }
          },
          ticks: {
            font: {
              size: fontSize
            }
          }
        }
      }
    };
  };

  // Create chart
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Blue",
          data: [34, 6, 16, 16, 10, 38, 25, 25, 38],
          backgroundColor: "#2528ff"
        },
        {
          label: "Green",
          data: [25, 25, 8, 26, 4, 48, 38, 8, 33],
          backgroundColor: "#008000"
        },
        {
          label: "Red",
          data: [8, 8, 5, 10, 8, 8, 16, 16, 8],
          backgroundColor: "#dc544b"
        }
      ]
    },
    options: getResponsiveOptions()
  });

  // Update chart on resize
  window.addEventListener("resize", () => {
    chart.options = getResponsiveOptions();
    chart.update();
  });
});

//calender
document.addEventListener("DOMContentLoaded", () => {
  // const calendarBtn = document.querySelector('img[alt="calender"]').parentElement;
  const calendarBtn = document.querySelector('.header-icon-btn[aria-label="Calendar"]');
  const calendarModal = document.getElementById("calendarModal");
  const closeCalendar = document.getElementById("closeCalendar");
  const calendarGrid = document.querySelector(".calendar-grid");
  const calendarMonth = document.getElementById("calendarMonth");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let currentDate = new Date();

  // Toggle modal
  calendarBtn.addEventListener("click", () => {
    calendarModal.classList.toggle("hidden");
    renderCalendar(currentDate);
  });

  closeCalendar.addEventListener("click", () => {
    calendarModal.classList.add("hidden");
  });

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    calendarMonth.textContent = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    calendarGrid.innerHTML = "";

    // Previous month days
    for (let i = firstDay; i > 0; i--) {
      calendarGrid.innerHTML += `<div class="inactive">${prevLastDate - i + 1}</div>`;
    }

    // Current month days
    for (let d = 1; d <= lastDate; d++) {
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      calendarGrid.innerHTML += `<div class="${isToday ? "today" : ""}">${d}</div>`;
    }

    // Next month days to fill the grid
    const totalCells = firstDay + lastDate;
    const nextDays = 42 - totalCells; // 6 rows of 7 days = 42
    for (let i = 1; i <= nextDays; i++) {
      calendarGrid.innerHTML += `<div class="inactive">${i}</div>`;
    }
  }
});

const backArrow = document.getElementById("backArrow");
const closeCalendar = document.getElementById("closeCalendar");

backArrow.addEventListener("click", () => {
  calendarModal.classList.add("hidden");
});

closeCalendar.addEventListener("click", () => {
  calendarModal.classList.add("hidden");
});

// Budgeting
// Calculator open/close (targets the existing Calculator button)
const calculatorModal = document.getElementById("calculatorModal");
const closeCalculatorBtn = document.getElementById("closeCalculator");

// Try to bind to the outer Calculator button without changing header markup
const calcBtn = document.querySelector('.header-icon-btn[aria-label="Calculator"]');
// Fallback: also listen on the inner image if nested buttons exist
const calcImg = document.querySelector('.header-icon-btn[aria-label="Calculator"] img[alt="calculator"]');

function openCalc() { calculatorModal.classList.remove('hidden'); }
function closeCalc() { calculatorModal.classList.add('hidden'); }

if (calcBtn) calcBtn.addEventListener('click', openCalc);
if (calcImg) calcImg.addEventListener('click', openCalc);
if (closeCalculatorBtn) closeCalculatorBtn.addEventListener('click', closeCalc);

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav"); // the nav container
  const navToggle = document.querySelector(".nav-toggle-btn");

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("active");       // show/hide nav
    navToggle.classList.toggle("active"); // turn hamburger <-> X
  });
});

