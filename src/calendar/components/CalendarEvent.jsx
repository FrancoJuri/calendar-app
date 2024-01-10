

const CalendarEvent = ({ event }) => {

    const { title } = event;

    return (
        <div>
            <strong>{ title }</strong>
            <span>&nbsp;-&nbsp;</span>
            <span className="event-link">Ver detalles</span>
        </div>
    )
}

export default CalendarEvent;