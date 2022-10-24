export const  tzToString = (date) => {
  if (typeof date !== "string") return "";
  /*
  const d = new Date(date);
  const date = new Date();
  */
  const tzString = "America/Lima";
  const d = new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
  d.setHours(d.getHours()-7)

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
  return `${padTwo0(d.getDate())} ${monthName} ${d.getFullYear()} ${padTwo0(d.getHours())}:${padTwo0(d.getMinutes())}:${padTwo0(d.getSeconds())}`;
};