import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUnSelectEvent, onUpdateEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { formatEventsDates } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const setClickOutside = () => {
        dispatch(onUnSelectEvent());
    }

    const startSavingEvent = async (calendarEvent) => {

        const formattedStartDate = new Date(calendarEvent?.start).getTime();
        const formattedEndDate = new Date(calendarEvent?.end).getTime();

        const finalObj = {
            ...calendarEvent,
            start: formattedStartDate,
            end: formattedEndDate,
        }

        try {

            if(calendarEvent.id){
            
                await calendarApi.put(`/events/${calendarEvent.id}`, finalObj);
    
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                
                return;
            }
    
            const { data } = await calendarApi.post('/events', finalObj);
                
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user, }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar evento', error.response.data?.msg, 'error');
        }
    }

    const startDeletingEvent = async () => {
        
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar evento', error.response.data?.msg, 'error');
        }

    }


    const startLoadingEvents = async () => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = formatEventsDates(data.events);
            
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error);

        }
    }


    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?.id,

        // Methods
        setActiveEvent,
        setClickOutside,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
} 