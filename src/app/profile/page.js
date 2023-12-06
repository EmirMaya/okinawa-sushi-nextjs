'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserLinks from "@/components/layout/UserLinks";
import UserForm from "../../components/layout/UserForm";


export default function ProfilePage() {
    const session = useSession();
    const { status } = session;
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
         
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                });
            });
        }
    }, [session, status])

    const handleProfileUpdate = async (e, data) => {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve()
            else
                reject()
        });

        await toast.promise(savingPromise, {
            loading: 'Guardando...',
            success: '¡Guardado!',
            error: 'Error, intenta más tarde',
        });

    }





    if (status === 'loading' || !profileFetched) {
        return (
            <div className="p-2 flex justify-center bg-violet-100 items-center h-screen">
                <div className="border-t-4 border-violet-500 border-solid rounded-full animate-spin h-16 w-16 border-t-transparent"></div>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }



    return (
        <section className='my-8'>
            <UserLinks isAdmin={isAdmin} />
            <div className='max-w-xs mx-auto'>
                <UserForm user={user} onSave={handleProfileUpdate}/>
            </div>
        </section>
    )
}