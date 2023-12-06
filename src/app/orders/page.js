'use client';
import { useProfile } from '@/components/UseProfile';
import UserLinks from '@/components/layout/UserLinks';

export default function OrdersPage() {
    const { loading: profileLoading, data: profileData } = useProfile();
    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }

    return (
        <section className="my-8">
            <UserLinks isAdmin={profileData.admin} />
        </section>
    )
}