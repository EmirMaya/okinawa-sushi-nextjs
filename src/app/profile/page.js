'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserLinks from "@/components/layout/UserLinks";
import EditableImage from "../../components/layout/EditableImage";


export default function ProfilePage() {

    const session = useSession();
    const { status } = session;
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState(session?.data?.phone || ''); // Inicializa con el valor del teléfono si está disponible, de lo contrario, usa una cadena vacía
    const [streetAddress, setStreetAddress] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const [userImage, setUserImage] = useState('');
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session?.data?.user?.name);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setIsAdmin(data.admin);
                    setUserImage(data.image);
                    setProfileFetched(true);
                });
            });
        }
    }, [session, status])

    const handleProfileUpdate = async e => {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    streetAddress,
                    phone,
                }),
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


                <div className='flex gap-2 items-start justify-center w-full'>
                    <EditableImage link={userImage} setLink={setUserImage} />
                    <form className="w-full " onSubmit={handleProfileUpdate}>
                        <label>Usuario</label>
                        <input type='text' value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nombre y Apellido" />
                        <label>Email</label>
                        <input type='email' disabled={true} value={session.data.user.email} />
                        <label>Teléfono</label>
                        <input type="tel" placeholder="N° Teléfono"
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />
                        <label>Dirección</label>
                        <input type="text" placeholder="Dirección"
                            value={streetAddress} onChange={e => setStreetAddress(e.target.value)}
                        />
                        <button
                            className='bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                            type="submit"
                        >
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}