import { useEffect, useMemo, useState } from 'react';
import { addHours, addYears, differenceInSeconds, setHours, setMinutes } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const CalendarModal = () => {

    const { activeEvent, startSavingEvent, startDeletingEvent } = useCalendarStore();

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if(activeEvent === null) return;

        setFormValues({ ...activeEvent });
    }, [activeEvent])

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const handleDelete = async () => {

        await startDeletingEvent();

        closeDateModal();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        
        if(isNaN(difference) || difference <= 0){
            Swal.fire('Fechas no permitidas', 'Revisa las fechas ingresadas e intentalo nuevamente', 'error');
            return;
        }

        if(formValues.title.length <= 0){
            return;
        }

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h2 className='container'>
                {
                    (activeEvent?.id)
                    ?
                    'Modificar Evento'
                    :
                    'Crear Evento'
                }
            </h2>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="d-grid form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(e) => onDateChanged(e, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="d-grid form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        minTime={setHours(setMinutes(new Date(), formValues.start.getMinutes()), formValues.start.getHours())}
                        maxTime={setHours(setMinutes(addYears(new Date(), 1000) , 30), 23)}
                        selected={formValues.end}
                        onChange={(e) => onDateChanged(e, 'end')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className='mt-2 d-flex justify-content-between'>
                    <div className='d-flex gap-3'>
                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>

                        {
                            (activeEvent?.id)
                            &&
                            <button
                                type='button'
                                className="btn btn-danger btn-block"
                                onClick={handleDelete}
                            >
                                <i className='fa fa-trash'></i>
                                <span> Borrar</span>
                            </button>
                        }
                    </div>

                    <button type='button' className="btn btn-outline-danger btn-block" onClick={closeDateModal}>
                        Cerrar
                    </button>
                </div>

            </form>

            
        </Modal>
    )
}

export default CalendarModal;