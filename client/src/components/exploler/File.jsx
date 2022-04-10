import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir, pushToDirStack, setContextMenu } from '../../reducers/action_creators/filesActionCreators'
import { ReactComponent as FolderSVG } from '../../assets/folder-open-outline.svg'
import { ReactComponent as FileSVG } from '../../assets/document-outline.svg'
import ContextMenu from '../UI/ContextMenu'

const File = ({ file }) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)


    const openDirHandler = file => {
        dispatch(pushToDirStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    const openFileInfo = file => {
        return null
    }

    return (
        <div
            className='explorer-body-file unselectable'
            title={`Имя: ${file.name}. Дата: ${file.date.slice(0, 10)}.`}
            tabIndex='0'
            onClick={() => (file.type === 'dir' ? openDirHandler(file) : openFileInfo(file))}
        >
            {file.type === 'dir' ? <FolderSVG /> : <FileSVG />}
            <p>{file.name}</p>
        </div>
    )
}

export default File