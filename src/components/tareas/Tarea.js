import React, {useContext} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

export default function Tarea({tarea}) {

    const contexto = useContext(ProyectoContext)
    const { proyecto } = contexto

    const tareasContext = useContext(TareaContext)
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext


    // Extraer el proyecto
    const [proyectoActual] = proyecto
    // Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea

    const tareaEliminar = (id) => {
        console.log(id)
        eliminarTarea(id)
        obtenerTareas(proyectoActual.id)
    }

    // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        } else {
            tarea.estado = true
        }

        cambiarEstadoTarea(tarea)
    }

    // Agrega una tarea actual cuando el usuario desea editarla

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return (
        <div>
            <li className="tarea sombra">
                <p>{tarea.nombre}</p>
                <div className="estado">
                    {
                        tarea.estado 
                        ? 
                            (
                                <button 
                                    type="button"
                                    className="completo"
                                    onClick={() => cambiarEstado(tarea)}
                                >Completo</button>
                            )
                        :
                            (
                                <button
                                    type="button"
                                    className="incompleto"
                                    onClick={() => cambiarEstado(tarea)}
                                >Incompleto</button>
                            )
                    }

                    <div className="acciones">
                        <button
                            type="button"
                            className="btn btn-primario"
                            onClick={() => seleccionarTarea(tarea)}
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            className="btn btn-secundario"
                            onClick={() => tareaEliminar(tarea.id)}
                        >
                            Eliminar
                        </button>

                    </div>

                </div>
            </li>
        </div>
    )
}
