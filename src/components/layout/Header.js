'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const session = useSession();

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if(userName && userName.includes(' ')) {
        userName = userName.split(' ')[0] //traigo solo lo de antes del espacio, osea digamos el nombre
    }

    useEffect(() => {
        const handleResize = () => {
            // Cierra el menú desplegable cuando el tamaño de la pantalla sea mayor que el de una tablet
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        // Agrega el listener para manejar el cambio de tamaño de la pantalla
        window.addEventListener('resize', handleResize);

        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente



    return (
        <header className='flex flex-col items-center justify-between'>
            <div className='flex items-center justify-between w-full px-8 py-4'>
                <Link className='text-violet-500 font-semibold text-xl' href='/'>OKINAWA SUSHI</Link>
                <div className='md:hidden'>
                    <button onClick={handleMobileMenuToggle}>
                        {/* Aquí puedes poner un ícono de menú, por ejemplo: */}
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={`w-full pr-8 flex flex-col md:flex-row items-end gap-8 text-neutral-600 font-semibold transition-all duration-300 ${isMobileMenuOpen ? 'h-auto' : 'h-0 overflow-hidden'}`}>
                <Link href={''}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
                {status === 'authenticated' && (

                    <>
                        <Link className='whitespace-nowrap' href={'/profile'}>
                            Hola, {userName}
                            </Link>
                        <button
                            onClick={() => signOut()}
                            className='bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                        >
                            Logout
                        </button>
                    </>

                )}

                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link className='bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200' href={'/register'}>Register</Link>
                    </>
                )}

            </nav>
        </header>
    );
}
