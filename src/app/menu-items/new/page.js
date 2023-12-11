'use client';
import { useProfile } from "@/components/UseProfile";
import UserLinks from "@/components/layout/UserLinks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import LeftArrow from '@/components/icons/LeftArrow';
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";


export default function NewMenuItemPage() {
    const [redirectToMenu, setRedirectToMenu] = useState(false);
    const { loading: profileLoading, data: profileData } = useProfile();

    const handleFormSubmit = async (e, data) => {
        e.preventDefault();
        // Verifica que data tenga la propiedad "category"
        if (!data.category) {
            console.log(data.category);
            // Puedes manejar este caso específico según tus requisitos.
            console.error('La propiedad "category" no está definida en los datos.');
            return;
        }
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
            loading: 'Guardando...',
            success: '¡Guardado!',
            error: 'Error, intenta más tarde',
        });

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
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    )

}