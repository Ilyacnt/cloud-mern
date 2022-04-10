import React, { useState } from 'react'
import classes from './Uploader.module.scss'
import { ReactComponent as CloseSVG } from '../../assets/close-circle-outline.svg'
import UploaderFile from './UploaderFile'
import { useSelector, useDispatch } from 'react-redux'
import { hideUploader } from '../../reducers/action_creators/uploadActionCreators'
import animeGif from '../../assets/miracle-nikki-phone.gif'

const Uploader = () => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [stylesDrag, setStylesDrag] = useState(null)
    const [points, setPoints] = useState({})
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)


    const files = useSelector(state => state.upload.files)


    const startDrag = (e) => {
        setIsMouseDown(true)
        setPoints({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top
        })
    }

    const mouseMove = (e) => {
        if (isMouseDown) {
            let left = e.screenX - points.diffX
            let top = e.screenY - points.diffY
            setStylesDrag({ left, top })
        }
    }

    const mouseUp = (e) => {
        setIsMouseDown(false)
    }


    return (isVisible &&
        <div
            style={stylesDrag}
            className={classes.uploader}
            // onMouseDown={e => startDrag(e)}
            // onMouseMove={e => mouseMove(e)}
            // onMouseUp={e => mouseUp(e)}
        >
            <div className={classes.head}>
                <p>Загрузки</p>
                <CloseSVG className={classes.close} onClick={() => dispatch(hideUploader())} />
            </div>
            <div className={classes.body}>
                {files.length > 0 ? files.map(file => (
                    <UploaderFile key={file.id} file={file} />
                ))
                    :
                    <div className={classes.emptylist}>
                        <img src={animeGif} alt="sad anime girl" className={classes.gif} />
                        <p>Тут пока ничего нет</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Uploader