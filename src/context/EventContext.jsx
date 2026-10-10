import { createContext, useState, useEffect } from "react";
import { events as initialEvents } from "../utils/data";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : initialEvents;
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === updatedEvent.id ? updatedEvent : item))
    );
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}