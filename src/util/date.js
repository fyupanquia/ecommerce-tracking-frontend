export const tzToString = (date, addHours) => {
  if (typeof date !== "string") return "";

  const tzString = "America/Lima";
  let d = new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
  if (addHours) {
    const unix = d.setHours(d.getHours() + addHours);
    d = new Date(unix)
  }

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

  const padTwo0 = (arg) => `${arg}`.padStart(2, "0");

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthName = months[d.getMonth()];
  const dayName = days[d.getDay()];
  return `${padTwo0(d.getDate())} ${monthName} ${d.getFullYear()} ${padTwo0(
    d.getHours()
  )}:${padTwo0(d.getMinutes())}:${padTwo0(d.getSeconds())}`;
};
