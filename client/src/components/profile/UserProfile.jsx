import React from 'react'
import classes from './UserProfile.module.scss'
import env from "react-dotenv"
import AvatarPlaceholderIMG from '../../assets/avatar-placeholder.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../reducers/action_creators/userActionCreators'
import formatFileSize from '../../utils/formatFileSize'
import { deleteAvatar, uploadAvatar } from '../../actions/user'


const UserProfile = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const avatar = currentUser.avatarUrl ? `${env.DB_URL}/${currentUser.avatarUrl}` : AvatarPlaceholderIMG

    const changeHandler = e => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }


    return (
        <div className={classes.window}>
            <div className={classes.header}>
                <div className={classes.group}>
                    <p className={classes.email}>{currentUser.firstName}</p>
                    <img src={avatar} alt='user avatar' />
                </div>
                <button className="btn-default" onClick={() => dispatch(logoutUser())}>Выйти из профиля</button>
            </div>
            <div className={classes.body}>
                <div className={classes.btnsgroup}>
                    <div className="input-wrapper">
                        <label id={classes.input_label} htmlFor={classes.upload_input}>Загрузить аватар</label>
                        <input accept="image/*" type="file" id={classes.upload_input} multiple={true} onChange={e => changeHandler(e)} />
                    </div>
                    <button className="btn-default" onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
                </div>

                <p>Электронная почта: <b>{currentUser.email}</b></p>
                <p>Объем диска: <b>{formatFileSize(currentUser.diskSpace)}</b></p>
                <p>Использованное пространство: <b>{formatFileSize(currentUser.usedSpace)}</b></p>
            </div>
        </div>
    )
}

export default UserProfile