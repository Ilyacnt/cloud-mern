import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ContextMenu.module.scss'
import { pushToDirStack, setCurrentDir } from '../../reducers/action_creators/filesActionCreators'
import { deleteFile, downloadFile } from '../../actions/file'
import formatFileSize from '../../utils/formatFileSize'

const ContextMenu = () => {
    const dispatch = useDispatch()
    const { isShow, file, points } = useSelector(state => state.file.contextMenu)
    const currentDir = useSelector(state => state.file.currentDir)

    const downloadHandler = () => {
        downloadFile(file)
        console.log('Download', file.name)
    }

    const deleteHandler = () => {
        dispatch(deleteFile(file))
        console.log('Delete', file.name)
    }

    const openDirHandler = () => {
        dispatch(pushToDirStack(currentDir)) 
        dispatch(setCurrentDir(file._id))
    }


    return (
        <div style={points ? { top: `${points.y}px`, left: `${points.x}px` } : {}} className={isShow ? classes.window : classes.disable} >
            <div className={classes.group}>
                {file?.type !== 'dir' ? 
                <>
                    <button className={classes.btn} onClick={downloadHandler}>Скачать</button>
                    <button className={classes.btn} onClick={deleteHandler}>Удалить</button>
                    <hr className={classes.line} />
                    <p className={classes.info}>Размер: {formatFileSize(file?.size)}</p>
                    <p className={classes.info}>Расширение: .{file?.type}</p>
                </>
                :
                <>
                    <button className={classes.btn} onClick={openDirHandler}>Открыть</button>
                    <hr className={classes.line} />
                </>
                }

                <p className={classes.info}>Дата: {file?.date?.slice(0, 10)}</p>
            </div>
        </div>
    )
}

export default ContextMenu