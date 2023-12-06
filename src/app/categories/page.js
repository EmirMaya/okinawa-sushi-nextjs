'use client';
import React, { useState, useEffect } from 'react';
import UserLinks from '@/components/layout/UserLinks';
import { useProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';
import Trash from '@/components/icons/Trash';


export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        await fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    const handleCategorySubmit = async e => {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Editando categoría' : 'Creando nueva categoría...',
            success: editedCategory ? 'Categoría editada' : 'Categoría creada',
            error: 'Error, intenta de nuevo',
        });
    }

    const handleDeleteClick = async (_id) => {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(promise, {
            loading: 'Eliminando...',
            success: 'Categoría eliminada',
            error: 'Error, intenta de nuevo',
        });

        fetchCategories();
    }

    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }


    return (
        <section className='my-8'>
            <UserLinks isAdmin={profileData.admin} />
            <form onSubmit={handleCategorySubmit}>
                <div className='flex justify-center items-center gap-2 mx-4'>
                    <div className='grow'>
                        <label>
                            {editedCategory ? 'Editar categoría' : 'Nueva categoría'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input
                            type='text'
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button
                            type='submit'
                            className='mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                        >
                            {editedCategory ? 'Editar' : 'Crear'}
                        </button>
                        <button
                            className='px-5 py-3 bg-white border rounded-sm text-sm mt-2'
                            type='button'
                            onClick={() => {
                                setEditedCategory(null)
                                setCategoryName('')
                            }}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
            <div className='mx-4'>

                {categories?.length > 0 && categories.map((category, index) => (
                    <React.Fragment key={index} >
                        <span className='text-neutral-500 text-xs'>Editar</span>
                        <div
                            className='w-full bg-neutral-300 p-2 flex justify-between items-center gap-2  rounded-sm cursor-pointer'
                        >
                            <span className='font-semibold  text-neutral-800'>{category.name}</span>

                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={() => {
                                        setEditedCategory(category);
                                        setCategoryName(category.name);
                                    }}
                                    className='bg-white rounded-sm px-2 py-1 hover:bg-rose-200' type='button'>Edit</button>
                                <button
                                    onClick={() => handleDeleteClick(category._id)}
                                    className='bg-white rounded-sm py-1 px-2'
                                    type='button'>
                                    <Trash />
                                </button>
                            </div>


                        </div>
                    </React.Fragment>
                ))}
            </div>
        </section>

    )
}