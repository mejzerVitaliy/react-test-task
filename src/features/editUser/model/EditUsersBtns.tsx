import React from 'react'

interface ButtonsProps{
    onClick: () => void
    onClickUndo: () => void
    isUndoBtn: boolean
}

const EditUsersBtns:React.FC<ButtonsProps> = ({onClick, onClickUndo, isUndoBtn}) => {
    return (
        <article className="w-[1080px] h-[48px] flex justify-end font-rubik text-[14px] ">
            {isUndoBtn && <button className='w-[100px] h-full flex justify-center items-center border border-solid border-[#c4c4c4]' onClick={onClickUndo}>Undo</button>}
            <button disabled={isUndoBtn ? false : true} onClick={onClick} className='w-[200px] h-full disabled:text-[#c4c4c4] flex justify-center items-center ml-[20px] border border-solid border-[#c4c4c4]'>
                Save
            </button>
        </article>
    )
}

export default EditUsersBtns