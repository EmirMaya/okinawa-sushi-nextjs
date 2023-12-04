'use client';
import { useProfile } from "@/components/UseProfile";
import UserLinks from "@/components/layout/UserLinks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import LeftArrow from '@/components/icons/LeftArrow';
import { redirect } from "next/navigation";


export default function NewMenuItemPage() {
    const { loading: profileLoading, data: profileData } = useProfile();

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [redirectToMenu, setRedirectToMenu] = useState(false);


    const handleFormSubmit = async e => {
        e.preventDefault();
        const data = { image, name, description, price, };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Guardando categoría...',
            success: '¡Categoría guardada!',
            error: 'Error, intenta más tarde',
        });

        setName('');
        setImage('');
        setPrice('');
        setDescription('');
        setRedirectToMenu(true);
    }

    if (redirectToMenu) return redirect('/menu-items');

    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }


    return (
        <section className="my-8 mx-4 ">
            <UserLinks isAdmin={profileData.admin} />
            <Link
                className='flex items-center gap-2 justify-center mt-2 text-sm px-5 py-3 bg-rose-50  rounded-sm hover:bg-rose-100 hover:text-neutral-200'
                href={'/menu-items'} >
                <LeftArrow />
                <span>Volver</span>

            </Link>
            <form onSubmit={handleFormSubmit}>
                <div className="flex items-center justify-center gap-2 ">

                    <div className="grow">
                        <label>Nombre del item</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label>Descripción</label>
                        <input
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <label>Precio base</label>
                        <input
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <label>Url de la imagen</label>
                        <input
                            type="text"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>

                </div>
                <div>
                    <button
                        type='submit'
                        className='mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                    >
                        Crear
                    </button>
                </div>

            </form>
        </section>
    )

}