export const  tzToString = (date) => {
  const d = new Date(date);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Augosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthName = months[d.getMonth()];
  const dayName = days[d.getDay()];
  return `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`;
};