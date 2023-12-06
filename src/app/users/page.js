'use client';
import { useProfile } from '@/components/UseProfile';
import UserLinks from '@/components/layout/UserLinks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();


    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        });
    }, []);

    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }

    return (
        <section className="my-8 mx-4">
            <UserLinks isAdmin={profileData.admin} />
            <div>
                {users?.length > 0 && users?.map((user, index) => (
                    <div key={index} className='bg-neutral-200 rounded-sm mb-2 p-2 gap-4 flex items-center justify-between'>
                        <div className='text-neutral-600'>
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className='italic'>No name</span>)}
                        </div>
                        <div className='text-blue-800'>
                            <span>{user?.email}</span>
                        </div>
                        <div>
                            <Link
                                href={'/users/' + user._id}
                                className='px-2 py-1 border border-neutral-400 rounded-sm'>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}