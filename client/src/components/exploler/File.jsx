import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir, pushToDirStack } from '../../reducers/action_creators/filesActionCreators'
import { ReactComponent as FolderSVG } from '../../assets/folder-open-outline.svg'
import { ReactComponent as FolderSVG_dark } from '../../assets/folder-open-outline_dark.svg'
import { ReactComponent as FileSVG } from '../../assets/document-outline.svg'
import { ReactComponent as FileSVG_dark } from '../../assets/document-outline_dark.svg'
import { ThemeContext, themes } from '../theme/ThemeContext'

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
        <ThemeContext.Consumer>
            {({ theme }) => (
                <div
                    className='explorer-body-file unselectable'
                    title={`Имя: ${file.name}. Дата: ${file.date.slice(0, 10)}.`}
                    tabIndex='0'
                    onClick={() => (file.type === 'dir' ? openDirHandler(file) : openFileInfo(file))}
                >
                    {file.type === 'dir'
                        ?
                        theme === themes.light ?  <FolderSVG /> : <FolderSVG_dark />
                        :
                        theme === themes.light ? <FileSVG /> : <FileSVG_dark />
                    }
                    <p>{file.name}</p>
                </div>
            )}
        </ThemeContext.Consumer>

    )
}

export default File