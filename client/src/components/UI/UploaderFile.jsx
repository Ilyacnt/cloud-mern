import React from 'react'
import classes from './UploaderFile.module.scss'
import { ReactComponent as CloseSVG } from '../../assets/close-circle-outline_blue.svg'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../reducers/action_creators/uploadActionCreators'

const UploaderFile = ({ file }) => {
    const dispatch = useDispatch()

    return (
        <div className={classes.item}>
            <div className={classes.item_head}>
                <p>{file.name}</p>
                <CloseSVG className={classes.close} onClick={() => dispatch(removeUploadFile(file))} />
            </div>
            <div className={classes.progressbar}>
                <div style={{width: `${file.progress}%`}} className={classes.progressbar_scale}>
                    <div className={classes.progressbar_percent}>{file.progress}%</div>
                </div>

            </div>
        </div>
    )
}

export default UploaderFile