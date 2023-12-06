import Trash from '@/components/icons/Trash';
import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {

    const [showConfirm, setShowConfirm] = useState(false);


    if (showConfirm) {
        return (
            <div className='fixed bg-black/50 inset-0 flex items-center h-full justify-center'>
                <div className='flex flex-col justify-center mt-4 bg-white p-4 rounded-sm'>
                    <h4 className='text-center'>¿Seguro que quieres eliminar este item?</h4>
                    <div className='w-full flex justify-center items-center gap-2'>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className='py-2 px-4 border border-neutral-400' type='button'>Cancelar</button>
                        <button
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                            type='button' className='py-2 px-4 rounded-sm bg-violet-400'>Eliminar</button>
                    </div>
                </div>
            </div>


        )
    }


    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="w-full py-2 px-4 border border-neutral-400 rounded-sm flex items-center justify-center"
            type="button"
        >
            {label}

            <Trash />
        </button>
    )
}