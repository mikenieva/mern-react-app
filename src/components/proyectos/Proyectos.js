/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

import AuthContext from '../../context/autenticacion/AuthContext'

export default function Proyectos(props) {    

    // Extraer la info de autenticación
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado } = authContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])
 
    if(!usuario) return null;

    return (
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>

            </div>

        </div>
    )
}
