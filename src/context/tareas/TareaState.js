import React, {useReducer} from 'react'
import TareaReducer from  './TareaReducer'
import TareaContext from './TareaContext'

import { v4 as uuidv4 } from 'uuid';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA 
} from '../../types'

export default function TareaState (props){

    const initialState = {
        tareas: [
            { id: 1, nombre: "Elegir Plataforma",estado: false, proyectoId: 1 },
            { id: 2 ,nombre: "Elegir Colores",estado: false, proyectoId: 2 },
            { id: 3 ,nombre: "Elegir Plataformas de pago",estado: false, proyectoId: 3 },
            { id: 4 ,nombre: "Elegir Hosting",estado: true, proyectoId: 4 },
            { id: 5 ,nombre: "Elegir Plataformach",estado: false, proyectoId: 1 },
            { id: 6, nombre: "Elegir Colorech",estado: false, proyectoId: 2 },
            { id: 7, nombre: "Elegir Plataformas de pagoch",estado: false, proyectoId: 3 },
            { id: 8, nombre: "Elegir Hostingch",estado: true, proyectoId: 4 },
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // FUNCIONES DE DISPATCH

    // OBTENER LAS TAREAS DE UN PROYECTO
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    // AGREGAR UNA TAREA AL PROYECTO SELECCIONADO

    const agregarTarea = tarea => { 

        tarea.id = uuidv4()

        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }


    // Eliminar tarea por su id
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
// CAMBIA EL ESTADO DE CADA TAREA
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

// Extrae una tarea para ediciónç
const guardarTareaActual = tarea => {
    dispatch({
        type: TAREA_ACTUAL,
        payload: tarea
    })
}

// EDITA O MODIFICA una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    // ELIMINA LA TAREA SELECCIONADA
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
 
    return (
        <TareaContext.Provider value={{
            tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}>
            {props.children}
        </TareaContext.Provider>

    )

}