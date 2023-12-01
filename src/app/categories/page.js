'use client';
import React, { useState, useEffect } from 'react';
import UserLinks from '@/components/layout/UserLinks';
import { useProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';



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
                    <div>
                        <button
                            type='submit'
                            className='mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                        >
                            {editedCategory ? 'Editar' : 'Crear'}
                        </button>
                    </div>
                </div>
            </form>
            <div className='mx-4'>

                {categories?.length > 0 && categories.map((category, index) => (
                    <React.Fragment key={index} >
                        <span className='text-neutral-500 text-xs'>Editar</span>
                        <button
                            onClick={() => {
                                setEditedCategory(category);
                                setCategoryName(category.name);
                            }}
                            className='w-full bg-neutral-200 p-2 flex items-center gap-2  rounded-sm cursor-pointer'
                        >
                            <span className='font-semibold text-neutral-800'>{category.name}</span>
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </section>

    )
}