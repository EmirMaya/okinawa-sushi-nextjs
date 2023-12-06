'use client';
import { useProfile } from '@/components/UseProfile';
import UserLinks from '@/components/layout/UserLinks';
import UserForm from '@/components/layout/UserForm';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';


export default function EditUserPage() {
    const [user, setUser] = useState(null);
    const { loading: profileLoading, data: profileData } = useProfile();
    const { id } = useParams();

    useEffect(() => {
        fetch('api/users').then(response => {
            response.json().then(users => {
                const user = users.find(user => user._id === id);
                setUser(user);
            });
        });
    }, []);

    const handleSaveClick = async (e, data) => {
        e.prevent.default;
        const promise = new Promise(
            await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id })
            })
        )
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