import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2),
            user: {
                name: 'Franco',
                id: '123'
            }
        });
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab" onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}

export default FabAddNew;