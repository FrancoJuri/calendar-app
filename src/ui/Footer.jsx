import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="d-flex justify-content-center pb-3 mt-4">
            <h3 className="mb-0 text-center">
                App de Calendario creada por <Link to='https://francojuri.com' target='_blank'>Franco Juri</Link>
            </h3>
        </footer>
    )
}

export default Footer;