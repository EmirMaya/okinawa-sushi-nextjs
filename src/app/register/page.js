'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';


export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setUserCreated(true)
        } else {
            setError(true)
        }
        setCreatingUser(false);

    }

    return (
        <section className='my-8'>
            <h1 className='text-center text-violet-500 text-3xl font-semibold'>Registrarse</h1>
            {userCreated && (
                <div className='my-4 text-center'>
                    Usuario registrado. <br />
                    Puedes {' '}
                    <Link className='underline font-semibold text-violet-500' href={'/login'}>  iniciar sesión.</Link>
                </div>
            )}
            {error && (
                <div className='my-4 text-center'>
                    Ocurrió un error. <br />
                    Por favor intenta de nuevo.
                </div>
            )}
            <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
                <input
                    type='email'
                    placeholder='email'
                    value={email}
                    disabled={creatingUser}
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    disabled={creatingUser}
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className='py-2 px-4 text-center bg-rose-300 w-full mb-4 hover:bg-rose-500 hover:text-neutral-200 rounded-sm'
                    type='submit'
                    disabled={creatingUser}
                >
                    Registrase
                </button>
                <p className='text-sm my-2 text-center text-neutral-500 w-full'>O inicia con provider</p>
                <button type='button'
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className='py-2 px-4 flex justify-center items-center gap-4 border rounder-sm border-neutral-300 w-full'>
                    <Image src={'/google.png'} alt={'google login'} width={'24'} height={'24'} />
                    Registrarse con Google
                </button>
                <p className='text-center text-neutral-700 text-sm mt-2'>
                    ¿Ya tienes cuenta?{' '}
                    <Link className='underline font-semibold text-violet-500' href='/login'>Inicia sesión &raquo;</Link>
                </p>
            </form>
        </section>
    )
}