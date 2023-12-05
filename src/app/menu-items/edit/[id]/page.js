'use client';
import { useProfile } from "@/components/UseProfile";
import UserLinks from "@/components/layout/UserLinks";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LeftArrow from '@/components/icons/LeftArrow';
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function EditMenuItemPage() {

    const { loading: profileLoading, data: profileData } = useProfile();
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToMenu, setRedirectToMenu] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(items => {
                const item = items.find(item => item._id === id);
                setMenuItem(item);
            });
        });
    }, []);


    const handleFormSubmit = async (e, data) => {
        e.preventDefault();
        const item = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(item),
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        </section>
    )
}