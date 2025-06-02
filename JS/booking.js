// Get a DOM element
const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const timeSlotsContainer = document.getElementById('time-slots-container');
const amPmSelector = document.getElementById('am-pm-selector');
const timeSlots = document.getElementById('time-slots');
const bookAppointmentBtn = document.getElementById('book-appointment');
const termsContainer = document.getElementById('terms-container');
const checkbox1 = document.getElementById('terms-checkbox1');
const checkbox2 = document.getElementById('terms-checkbox2');


// Current date information
let currentDate = new Date();


// Render calendar
function renderCalendar(date) {
  calendarBody.innerHTML = '';
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  monthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  let day = firstDay.getDay();
  let dateNumber = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < day) {
        cell.textContent = '';
      } else if (dateNumber > lastDay.getDate()) {
        cell.textContent = '';
      } else {
        cell.textContent = dateNumber;
        cell.classList.add('date-cell');
        dateNumber++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

// Switching month
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Click on the calendar date event
calendarBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('date-cell') && event.target.textContent !== '') {
    const selectedDay = event.target.textContent;
    const selectedMonth = currentDate.getMonth() + 1;
    const selectedYear = currentDate.getFullYear();
    const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    // Ensure that selectedDateHeading exists
    let selectedDateHeading = document.getElementById('selected-date');
    selectedDateHeading.textContent = `Available Appointments for: ${selectedDate}`;

    renderTimeSlots(selectedDate);
    timeSlotsContainer.style.display = 'block';
    termsContainer.style.display = 'block';
  }
});

// Render period
function renderTimeSlots(selectedDate) {
  timeSlots.innerHTML = '';
  const isAmSelected = amPmSelector.value === 'AM';
  const startHour = isAmSelected ? 0 : 12;
  const endHour = isAmSelected ? 12 : 24;

  for (let hour = startHour; hour < endHour; hour++) {
    const timeSlot = document.createElement('li');
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = isAmSelected ? 'AM' : 'PM';
    timeSlot.textContent = `${displayHour}:00 ${suffix}`;
    timeSlot.classList.add('time-slot');

    timeSlot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
      timeSlot.classList.add('selected');
    });

    timeSlots.appendChild(timeSlot);
  }
}

// AM/PM selector changes
amPmSelector.addEventListener('change', () => {
  renderTimeSlots();
});

// Tick box Changes and Appointment button enabled
function toggleBookButton() {
  bookAppointmentBtn.disabled = !(checkbox1.checked && checkbox2.checked);
  bookAppointmentBtn.classList.toggle('enabled', checkbox1.checked && checkbox2.checked);
}

checkbox1.addEventListener('change', toggleBookButton);
checkbox2.addEventListener('change', toggleBookButton);

// First page load render calendar
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentDate);
});

calendarBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('date-cell') && event.target.textContent !== '') {
      // Clear all other selected states
      document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
      
      // Set the date currently clicked to selected
      event.target.classList.add('selected');

      // Gets the selected date information
      const selectedDay = event.target.textContent;
      const selectedMonth = currentDate.getMonth() + 1;
      const selectedYear = currentDate.getFullYear();
      const selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

      // Update the selected date title
      const selectedDateHeading = document.getElementById('selected-date');
      selectedDateHeading.textContent = `Available Appointments for: ${selectedDate}`;
      
      // Display time period
      renderTimeSlots(selectedDate);
      timeSlotsContainer.style.display = 'block';
      termsContainer.style.display = 'block';
  }
});

// Form check function
function validateForm() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const dob = document.getElementById('dob').value;
  const idUpload = document.getElementById('id-upload').files.length;
  const phone = document.getElementById('phone-number').value.trim();
  const email = document.getElementById('email').value.trim();

  return (
      firstName && lastName && dob && idUpload > 0 &&
      phone && email &&
      document.querySelector('.time-slot.selected') && 
      checkbox1.checked && checkbox2.checked
  );
}

// Event listener for form submission
document.getElementById('book-appointment').addEventListener('click', () => {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const idUpload = document.getElementById('id-upload').files[0];
  const selectedTime = document.querySelector('.time-slot.selected');
  const phone = document.getElementById('phone-number').value.trim();
  const email = document.getElementById('email').value.trim();

  // Form validation logic
  if (!selectedTime) {
    alert('Please select a time slot.');
    return;
  }

  if (!firstName || !lastName) {
    alert('Please enter the full name.');
    return;
  }
  if (!dob) {
    alert('Please enter the date of birth.');
    return;
  }
  if (!phone) {
    alert('Please enter the phone number.');
    return;
  }
  if (!email) {
    alert('Please enter the email.');
    return;
  }
  if (!idUpload) {
    alert('Please upload your ID.');
    return;
  }

  // Display submitted successfully
  const selectedDate = document.getElementById('selected-date').textContent;
  alert(`Your appointment on ${selectedDate} at ${selectedTime.textContent} has been booked successfully.`);

  // // Refresh the page after submission
  location.reload();
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => { // showing button when scolled 1000px
    if (window.scrollY > 1000) { 
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => { // smooth scroll back to the top of page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});