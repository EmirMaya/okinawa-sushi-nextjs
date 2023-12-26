'use client';
import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';
import { useEffect, useState } from 'react';


export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const bestSellers = menuItems.slice(-4);
                setBestSellers(bestSellers);
            });
        });
    }, [])
    return (
        <section className='mt-6 mx-4 md:flex md:justify-center md:flex-col md:items-center'>
            <div className='text-center'>
                <SectionHeaders subHeader={'Nuestros'} mainHeader={'Más vendidos'} />
            </div>

            <div className='my-4 mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:mx-14 gap-4'>
                {bestSellers?.length > 0 && bestSellers.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>

        </section>
    )
}