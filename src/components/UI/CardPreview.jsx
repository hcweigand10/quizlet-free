import React, {useState} from 'react'
import ButtonDanger from './ButtonDanger'

const CardPreview = ({prompt, answer, children}) => {

    return (
        <div className='card bg-white p-4 max-w-md rounded shadow-md'>
          <div className='mb-2'>

             <h3 className='text-xl text-slate-700'>{prompt}</h3>
             <h4 className='text-md text-slate-500 italic'>{answer}</h4>
          </div>
             {children}
        </div>
    )
}

export default CardPreview