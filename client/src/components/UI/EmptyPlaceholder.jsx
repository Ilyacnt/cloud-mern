import React from 'react'
import classes from './EmptyPlaceholder.module.scss'
import animeGif from '../../assets/miracle-nikki-phone.gif'
import sadEyesGif from '../../assets/sad-eyes.gif'

const EmptyPlaceholder = () => {
    return (
        <div className={classes.wrap}>
            <img className={classes.gif} src={animeGif} alt="anime sad girl" />
            <p>Папка пуста</p>
        </div>
    )
}

export default EmptyPlaceholder