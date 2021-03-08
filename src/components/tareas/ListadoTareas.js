import React, { useContext } from 'react'
import Tarea from './Tarea'

import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

export default function ListadoTareas() {

    // Extraer proyecto de state inicial
    const context = useContext(ProyectoContext)
    const { proyecto, eliminarProyecto } = context

    // Obtener la función de las tareas del proyecto
    const tareaContexto = useContext(TareaContext) 
    const { tareasproyecto } = tareaContexto

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    // Elimina un proyecto

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <>
        <h2>Proyecto: {proyectoActual.nombre}</h2>

        <ul className="listado-tareas">
            {tareasproyecto.length === 0 
                ?  (<li className="tarea"><p>No hay tareas</p></li>)
                :  
                <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea 
                                key={tarea.id}
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                
            }
        </ul>

        <button
            type="button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
        >
            Eliminar Proyecto &times;
        </button>

        </> 
    )
}
