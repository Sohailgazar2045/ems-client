import React, { useState, useEffect } from "react";

function DayOfWeek() {
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = today.getDay();
    setDayOfWeek(days[dayIndex]);
  }, []);

  return <p>Today is {dayOfWeek}</p>;
}

export default DayOfWeek;
