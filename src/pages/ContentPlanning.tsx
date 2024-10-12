import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

const ContentPlanning: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, `users/${user.id}/events`), (snapshot) => {
        const fetchedEvents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
        } as Event));
        setEvents(fetchedEvents);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Enter a title for your event:');
    if (title) {
      const newEvent: Event = { title, start, end };
      addEvent(newEvent);
    }
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const addEvent = async (event: Event) => {
    if (user) {
      await addDoc(collection(db, `users/${user.id}/events`), event);
    }
  };

  const updateEvent = async (event: Event) => {
    if (user && event.id) {
      await updateDoc(doc(db, `users/${user.id}/events`, event.id), event);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (user) {
      await deleteDoc(doc(db, `users/${user.id}/events`, eventId));
      setSelectedEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Content Planning Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          style={{ height: 500 }}
        />
        {selectedEvent && (
          <div className="mt-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
            <p>Start: {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
            <p>End: {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
            <p>{selectedEvent.description}</p>
            <button
              onClick={() => deleteEvent(selectedEvent.id!)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPlanning;