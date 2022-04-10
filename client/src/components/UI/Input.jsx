import React, { useState } from 'react'
import classes from './Input.module.scss'

const Input = ({...attributes}) => {
    return (
        <input
            className={classes.input}
            {...attributes}
        />
    )
}

export default Input