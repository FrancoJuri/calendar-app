import { useMemo, useState } from 'react';
import { addHours, addYears, differenceInSeconds, setHours, setMinutes } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

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

    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Fernando',
        notes: 'Juri',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

    }, [formValues.title, formSubmitted])

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
        setIsOpen(false);
    }

    const onSubmit = (e) => {
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

        
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h1 className='container'>Nuevo evento</h1>
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

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal;