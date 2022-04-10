import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileList from './FileList'
import { getFiles, uploadFile } from '../../actions/file'
import PopUp from './PopUp'
import { setPopUp, setCurrentDir } from '../../reducers/action_creators/filesActionCreators'

const Explorer = () => {
	const [dragEnter, setDragEnter] = useState(false)
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.file.currentDir)
	const dirStack = useSelector(state => state.file.dirStack)
	const isPopUp = useSelector(state => state.file.popupDisplay)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	const showPopUp = () => {
		dispatch(setPopUp(true))
	}

	const backToParentDir = () => {
		const backDirId = dirStack.pop()
		dispatch(setCurrentDir(backDirId))
	}

	const fileUploadHandler = e => {
		const files = [...e.target.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))
	}


	const dragEnterHandler = e => {
		if (e.target.className === 'explorer-body') {
			e.stopPropagation()
			e.preventDefault()
			// console.log('Mouse enter to: ', e.target)
			setDragEnter(true)
		}
	}

	const dragOverHandler = e => {
		e.stopPropagation()
		e.preventDefault()
		setDragEnter(true)
	}

	const dragLeaveHandler = e => {
		if (e.target.className === 'drag-area unselectable') {
			e.stopPropagation()
			e.preventDefault()
			// console.log('Mouse leave from: ', e.target)
			setDragEnter(false)
		}
	}

	const dropHandler = e => {
		e.stopPropagation()
		e.preventDefault()
		let files = [...e.dataTransfer.files]
		files.forEach(file => dispatch(uploadFile(file, currentDir)))

		setDragEnter(false)
	}


	return (
		<div className="window explorer" onDrop={e => dropHandler(e)} onDragEnter={e => dragEnterHandler(e)} onDragLeave={e => dragLeaveHandler(e)} onDragOver={e => dragOverHandler(e)}>
			{isPopUp && <PopUp isPopUp={isPopUp} />}
			<div className="explorer-header">
				<p className="explorer-header-title">Файлы</p>
				<div className="explorer-header-group">
					<div className="explorer-header-group__btns">
						<button className="btn-default" onClick={showPopUp}>Создать папку</button>
						<div className="input-wrapper">
							<label id='input-label' htmlFor="upload-input">Загрузить файл</label>
							<input type="file" id='upload-input' multiple={true} onChange={e => fileUploadHandler(e)} />
						</div>
					</div>
					<button className="btn-default" onClick={backToParentDir}>Назад</button>
				</div>
			</div>
			<div className="explorer-body">
				{dragEnter ?
					<div className='drag-area unselectable'>Перетащите файлы сюда для загрузки</div>
					:
					<FileList />
				}
			</div>
		</div>
	)
}

export default Explorer