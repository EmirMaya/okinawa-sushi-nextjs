'use client';
import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';
import { useEffect, useState } from 'react';


export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const bestSellers = menuItems.slice(-3);
                setBestSellers(bestSellers);
            });
        });
    }, [])
    return (
        <section className='mt-6 mx-4'>
            <div className='text-center'>
                <SectionHeaders subHeader={'Chek out'} mainHeader={'Más vendidos'} />
            </div>

            <div className='my-4 grid grid-cols-2 gap-4'>
                {bestSellers?.length > 0 && bestSellers.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>

        </section>
    )
}