import React, {useContext} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

export default function Proyecto({proyecto}) {

    // Obtener el state de proyectos

    const contexto = useContext(ProyectoContext)
    const { proyectoActual } = contexto

    // Obtener la función de Tareas
    const contextoTareas = useContext(TareaContext)
    const {obtenerTareas} = contextoTareas

    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) // Fijar un proyecto actual
        obtenerTareas(id) // Filtrar las tareas cuando se de click
    }


    return (
        <div>
            <li>
                <button
                    type="button"
                    className="btn btn-blank"
                    onClick={() => seleccionarProyecto(proyecto._id) }
                >
                    {proyecto.nombre}
                </button>
            </li>
            
        </div>
    )
}
