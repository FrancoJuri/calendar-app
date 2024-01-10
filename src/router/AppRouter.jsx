import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";


const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])


    if(status === 'checking'){
        return (
            <div className="spinner-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        )
    }

    return (
        <Routes>

            {
                (status === 'not-authenticated')
                ?
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to='/auth/login' />} />
                </>
                :
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="/*" element={<Navigate to='/' />} />
                </>
            }

        </Routes>
    )
}

export default AppRouter;