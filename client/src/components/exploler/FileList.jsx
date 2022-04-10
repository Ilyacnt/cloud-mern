import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContextMenu } from '../../reducers/action_creators/filesActionCreators'
import ContextMenu from '../UI/ContextMenu'
import EmptyPlaceholder from '../UI/EmptyPlaceholder'
import Uploader from '../UI/Uploader'
import File from './File'


const FileList = () => {
    const dispatch = useDispatch()
    const files = useSelector(state => state.file.files)


    useEffect(() => {
        const handleClick = e => { dispatch(setContextMenu({ isShow: false, file: {}, points: {x: e.pageX, y: e.pageY} })) }

        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [])


    const contextMenuHandler = (e, file) => {
        e.preventDefault()
        const points = {
            x: e.pageX,
            y: e.pageY
        }

        dispatch(setContextMenu({
            points,
            isShow: true,
            file
        }))
    }

    if (files.length === 0) {
        return (<EmptyPlaceholder/>)
    }

    return (
        <div className="explorer-body-files">
            {files.map(file => (
                <div
                    key={file._id}
                    onContextMenu={e => contextMenuHandler(e, file)}
                >
                    <File file={file} showContextMenu />
                </div>
            ))}
            <ContextMenu />
            <Uploader />
        </div>
    )
}

export default FileList