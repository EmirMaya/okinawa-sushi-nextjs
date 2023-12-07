'use client';
import { useProfile } from '@/components/UseProfile';
import UserLinks from '@/components/layout/UserLinks';
import UserForm from '@/components/layout/UserForm';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';


export default function EditUserPage() {
    const [user, setUser] = useState(null);
    const { loading: profileLoading, data: profileData } = useProfile();
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(response => {
            response.json().then(user => {
                setUser(user);
            });
        });
    }, []);

    const handleSaveClick = async (e, data) => {
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id })
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(promise, {
            loading: 'Guardando...',
            success: '¡Guardado!',
            error: 'Error, intenta más tarde',
        });
    }

    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }

    return (
        <section className='mt-8 mx-4'>
            <UserLinks isAdmin={profileData.admin} />
            <div className='mt-8'>
                <UserForm user={user} onSave={handleSaveClick} />
            </div>
        </section>
    )
}