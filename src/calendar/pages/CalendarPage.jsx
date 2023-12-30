import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { localizer, getMessagesES } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal } from '../';


const events = [{
    title: 'cumpleaños jefe',
    notes: 'hay que comprar torta',
    start: new Date(),
    end: addHours( new Date(), 2),
    user: {
        name: 'Franco',
        id: '123'
    }
}]

const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: '#347CF7',
            borderRadious: '0px',
            opacity: 0.8,
            color: 'white',
        }

        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        console.log('double click:', e);
    }

    const onSelect = (e) => {
        console.log('on Select:', e);
    }

    const onViewChanged = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
        </>
    )
}

export default CalendarPage;