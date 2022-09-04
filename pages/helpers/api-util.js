export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-serverside-demo-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      events.push({
        id: key,
        ...element,
      });
    }
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
