import React, { useState } from 'react'
import Input from '../UI/Input'
import { ReactComponent as CloseSVG } from '../../assets/close-circle-outline.svg'
import { ReactComponent as CloseSVG_dark } from '../../assets/close-circle-outline_dark.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setPopUp } from '../../reducers/action_creators/filesActionCreators'
import { createDir } from '../../actions/file'
import { ThemeContext, themes } from '../theme/ThemeContext'


const PopUp = () => {
    const [value, setValue] = useState('')
    const isPopUp = useSelector(state => state.file.popupDisplay)
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    const createFolderHandler = () => {
        dispatch(createDir(currentDir, value))
        setValue('')
        dispatch(setPopUp(false))
    }


    return (
        <div className={isPopUp ? "popup" : "popup-hidden"} onClick={() => dispatch(setPopUp(false))}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <p className="popup-header-title">Создание папки</p>
                    <ThemeContext.Consumer>
                        {({ theme }) => (
                            theme === themes.light ?
                            <CloseSVG className="popup-header-close-btn" onClick={() => dispatch(setPopUp(false))} />
                            :
                            <CloseSVG_dark className="popup-header-close-btn" onClick={() => dispatch(setPopUp(false))} />
                        )}
                    </ThemeContext.Consumer>
                </div>
                <div className="popup-body">
                    <Input placeholder="Название папки" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button className="btn-default registration-btn" onClick={createFolderHandler}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp