import React, {useState} from 'react'
import ButtonDanger from './ButtonDanger'

const CardPreview = ({prompt, answer, children}) => {

    return (
        <div className='card bg-white p-4 max-w-md rounded shadow-md mb-2'>
          <div className='mb-2'>

             <h3 className='text-md text-slate-500 italic'>{prompt}</h3>
             <h4 className='text-xl text-slate-700'>{answer}</h4>
          </div>
             {children}
        </div>
    )
}

export default CardPreview