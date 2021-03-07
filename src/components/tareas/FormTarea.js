import React, {useState, useContext, useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext'

export default function FormTarea() {

    // Extraer si un proyecto está activo
    const context = useContext(ProyectoContext)
    const { proyecto } = context

    // Crear contexto de Tareas
    const tareaContext = useContext(TareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea  } = tareaContext

    // Detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // State del formulario

    const [tarea, guardarTarea] = useState({
        nombre: ""
    })

    // Extraer el nombre del proyecto
    const {nombre} = tarea

    // Si no hay proyecto seleccionado
    if (!proyecto) return null

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto


    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault()

        // Validar
        if(nombre.trim() === ""){
            validarTarea()
            return
        }        

        // Si es edición o si es nueva tarea
        if (tareaseleccionada === null){
            // tarea nueva
            // Agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            
            agregarTarea(tarea)
        } else {
            // Actualizar tarea existente
            actualizarTarea(tarea)

            // Elimina la tarea seleccionada del state
            limpiarTarea()
        }
        
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        // Reiniciar el form
        guardarTarea({
            nombre: ""
        })
    }

    return (
        <div>
            <div className="formulario">
                <form
                    onSubmit={onSubmit}
                >
                    <div className="contenedor-input">
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre tarea..."
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="contenedor-input">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-submit btn-block"                           
                            value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                        />
                    </div> 
                </form>

                {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
            </div>
        </div>
    )
}
