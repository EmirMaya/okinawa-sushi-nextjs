'use client';
import { useProfile } from "@/components/UseProfile";
import UserLinks from "@/components/layout/UserLinks";
import Link from "next/link";
import RightArrow from '@/components/icons/RightArrow';
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
    const { loading: profileLoading, data: profileData } = useProfile();
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        }, []);
    })

    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }

    return (
        <section className="my-8 mx-4 max-w-md md:mx-8 md:max-w-full">
            <UserLinks isAdmin={profileData.admin} />
            <div className="mt-8 mx-auto max-w-md">
                <Link
                    className='flex items-center justify-center mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                    href={'/menu-items/new'} >
                    <span>Nuevo item</span>
                    <RightArrow />
                </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
                {menuItems?.length > 0 && menuItems.map((item, index) => (
                    <div className="flex justify-start flex-col mt-8" key={index} >
                        <span className='text-neutral-500 text-xs'>Editar</span>
                        <Link className="rounded-sm" href={'/menu-items/edit/' + item._id}>
                            <div className='relative'>
                                <Image className="w-full h-56 object-cover" src={item.image} alt={'/item-image'} width={500} height={500} />
                            </div>
                            <div className="text-center text-md py-4 shadow-md rounded-sm border-neutral-300">
                                {item.name}
                            </div>

                        </Link>
                    </div>

                ))}
            </div>
        </section>
    )
}