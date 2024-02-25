document.addEventListener('DOMContentLoaded', function () {
  const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  let currentMonthIndex = 0; // Índice del mes actual
  const calendarContainer = document.querySelector('.calendar .months');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  renderMonth(currentMonthIndex);

  prevMonthBtn.addEventListener('click', function () {
      currentMonthIndex--;
      renderMonth(currentMonthIndex);
  });

  nextMonthBtn.addEventListener('click', function () {
      currentMonthIndex++;
      renderMonth(currentMonthIndex);
  });

  function renderMonth(monthIndex) {
      calendarContainer.innerHTML = ''; // Limpiar el contenido del calendario

      const monthDiv = document.createElement('div');
      monthDiv.classList.add('month');

      const monthNameDiv = document.createElement('div');
      monthNameDiv.classList.add('month-name');
      monthNameDiv.textContent = months[monthIndex];

      const daysDiv = document.createElement('div');
      daysDiv.classList.add('days');

      // Obtener el número de días en el mes
      const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();

      // Obtener el primer día de la semana en el mes
      const firstDayOfWeek = new Date(2024, monthIndex, 1).getDay();

      // Rellenar los días en blanco hasta el primer día de la semana
      for (let i = 0; i < firstDayOfWeek; i++) {
          const dayDiv = document.createElement('div');
          dayDiv.classList.add('day');
          daysDiv.appendChild(dayDiv);
      }

      // Rellenar los números de los días
      for (let dayIndex = 1; dayIndex <= daysInMonth; dayIndex++) {
          const dayDiv = document.createElement('div');
          dayDiv.classList.add('day');
          dayDiv.textContent = dayIndex;
          dayDiv.addEventListener('click', function () {
              openAppointmentModal(dayIndex, monthIndex);
          });
          daysDiv.appendChild(dayDiv);
      }

      monthDiv.appendChild(monthNameDiv);
      monthDiv.appendChild(daysDiv);
      calendarContainer.appendChild(monthDiv);
  }

  function openAppointmentModal(day, month) {
      const modal = document.getElementById('appointmentModal');
      const timeSlotsList = document.getElementById('timeSlots');
      timeSlotsList.innerHTML = ''; // Limpiar la lista de horarios

      // Crear horarios disponibles (de 8am a 8pm, cada 30 minutos)
      for (let hour = 8; hour <= 20; hour++) {
          for (let minutes = 0; minutes < 60; minutes += 30) {
              const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
              const timeSlotDiv = document.createElement('div');
              timeSlotDiv.classList.add('time-slot');
              timeSlotDiv.textContent = time;
              timeSlotsList.appendChild(timeSlotDiv);
          }
      }

      modal.style.display = 'block';

      // Cerrar modal al hacer clic en la "x"
      const closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.onclick = function () {
          modal.style.display = 'none';
      }

      // Cerrar modal si el usuario hace clic fuera del contenido
      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = 'none';
          }
      }
  }
});
