/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/AuthContext'

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext)
    const {autenticado, cargando, usuarioAutenticado } = authContext

    // const ctx = useContext(AuthContext)
    // ctx.autenticado
    // ctx.cargando


    useEffect(() => {
        usuarioAutenticado() // INCLUYE LA VERIFICACIÓN DEL USUARIO EN CADA COMPONENTE
    }, [])

    return(
        <Route {...props} render={ props => !autenticado && !cargando ? // ESTE USUARIO ESTÁ AUTENTICADO ?
            // NO, NO ESTÁ AUTENTICADO
            (
                <Redirect to="/" />
            ) 
            : 
            // SI, SI ESTÁ AUTENTICADO
            (
                <Component {...props} />
            )
        }>
        </Route>

    )
}

export default RutaPrivada