import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from '../';
import { useCalendarStore, useUiStore } from '../../hooks';


const CalendarPage = () => {

    const { events, setActiveEvent, setClickOutside, startLoadingEvents, activeEvent } = useCalendarStore();

    const { openDateModal } = useUiStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isActiveEvent = ( activeEvent && activeEvent.id === event.id );
        
        const style = {
            backgroundColor: '#347CF7',
            borderRadious: '0px',
            opacity: isActiveEvent ? 1 : 0.75,
            color: 'white',
            padding: '8px',
            cursor: 'default',
        }


        return {
            style
        }
    }

    const onSelect = (e) => {
        setActiveEvent(e);
        openDateModal();
    }
    
    const onUnSelectEvent = () => {
        setClickOutside();
    }

    const onViewChanged = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    }

    useEffect(() => {
        startLoadingEvents();
    }, [])

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
                onSelectEvent={onSelect}
                onView={onViewChanged}
                onSelectSlot={onUnSelectEvent}
                selectable
            />

            <CalendarModal />

            <FabAddNew />
        </>
    )
}

export default CalendarPage;