/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AlertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/autenticacion/AuthContext'


export default function NuevaCuenta(props) {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })


    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado o registrado. Un registro duplicado.

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [mensaje, autenticado, props.history])



    // Extraer de usuario
    const { nombre, email, password, confirmar } = usuario

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario quiera iniciar sesión

    const onSubmit = e => {
        e.preventDefault()
        
        // Validar que no haya campos vacios

        if (
            nombre.trim() === "" || 
            email.trim() === "" ||
            password.trim() === "" || 
            confirmar.trim() === "" 
        ){
            mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
            return
        }

        // Password mínimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta("El password debe ser de al menos 6 caracteres", "alerta-error")
            return
        }

        // Los dos passwords son iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no coinciden')
            return
        }

        // pasarlo al action
        registrarUsuario({
            nombre,
            email, 
            password
        })
    }

    return (
        <div className="form-usuario">
            {alerta ?  
                (
                    <div className={`alerta ${alerta.categoria}`}>
                        {alerta.msg}
                    </div>
                )
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>
                    
                    <div className="campo-form">            
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>

                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>

            </div>
            
        </div>
    )
}
