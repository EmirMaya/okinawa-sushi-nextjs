'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);


    const handleFormSubmit = async e => {
        e.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', { email, password, callbackUrl: '/' });
        setLoginInProgress(false);
    }

    return (
        <section className='my-8'>
            <h1 className='text-center text-violet-500 text-3xl font-semibold'>Iniciar Sesión</h1>
            <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='email'
                    value={email}
                    disabled={loginInProgress}
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    disabled={loginInProgress}
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className='py-2 px-4 text-center bg-rose-300 w-full mb-4 hover:bg-rose-500 hover:text-neutral-200 rounded-sm'
                    type='submit'
                    disabled={loginInProgress}
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
                    ¿No tienes cuenta?{' '}
                    <Link className='underline font-semibold text-violet-500' href='/register'>Regístrate &raquo;</Link>
                </p>
            </form>
        </section>
    )
}