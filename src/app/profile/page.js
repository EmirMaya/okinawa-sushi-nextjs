'use client';
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import Camera from "@/components/icons/Camera";
import { useState } from "react";

export default function ProfilePage() {
    const session = useSession();
    const { status } = session;
    const [userName, setUserName] = useState(session?.data?.user?.name || "");

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="border-t-4 border-violet-500 border-solid rounded-full animate-spin h-16 w-16 border-t-transparent"></div>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    const userImage = session?.data.user.image;

    return (
        <section className='mt-8'>
            <h1 className='text-center text-violet-500 text-3xl font-semibold'>Mi cuenta</h1>
            <form className='max-w-xs mx-auto'>
                <div className='flex gap-2 items-center justify-center w-full'>
                    <div className="p-2 rounded-full flex flex-col items-center gap-2">
                        <Image className='rounded-full' src={userImage} width={64} height={64} alt={'foto de perfil'} />
                        <button className="rounded-sm py-0.5 px-4 bg-neutral-300">
                            <Camera />
                        </button>
                    </div>
                    <div className="w-full">
                        <input type='text' placeholder="Nombre y Apellido" />
                        <input type='email' disabled={true} value={session.data.user.email} />
                        <button
                            className='bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}