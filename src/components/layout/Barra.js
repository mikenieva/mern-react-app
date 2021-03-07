/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/autenticacion/AuthContext'

export default function Barra() {

    // Extraer la infromación de autenticación
    const authContext = useContext(AuthContext)
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return (
        <header className="app-header">
            {usuario ? 
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
            :  null}
            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => {
                        cerrarSesion()
                    }}
                >
                    Cerrar sesión
                </button> 
            </nav>
        </header>
    )
}
