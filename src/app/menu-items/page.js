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
        <section className="my-8 mx-4 max-w-md ">
            <UserLinks isAdmin={profileData.admin} />
            <div className="mt-8 mx-auto">
                <Link
                    className='flex items-center justify-center mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                    href={'/menu-items/new'} >
                    <span>Nuevo item</span>
                    <RightArrow />
                </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-2">
                {menuItems?.length > 0 && menuItems.map((item, index) => (
                    <div className="flex justify-center flex-col" key={index} >
                        <span className='text-neutral-500 text-xs'>Editar</span>
                        <Link className="rounded-sm" href={'/menu-items/edit/' + item._id}>
                            <div className='relative'>
                                <Image className="w-full" src={item.image} alt={'/item-image'} width={100} height={100} />
                            </div>
                            <div className="text-center text-md py-2 border-2 border-t-0 rounded-sm border-neutral-300">
                                {item.name}
                            </div>

                        </Link>
                    </div>

                ))}
            </div>
        </section>
    )
}