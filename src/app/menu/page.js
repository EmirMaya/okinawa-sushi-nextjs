'use client';
import { useState } from "react"
import { useEffect } from "react"
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            });
        });

        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });
    }, []);

    return (
        <section className="my-8 mx-4">
            {categories?.length > 0 && categories.map((category, index) => (
                <div key={index}>
                    <div className="text-center my-8">
                        <SectionHeaders mainHeader={category.name} />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        {menuItems.filter(menu => menu.category === category._id).map((item, index) => (
                            <div key={index}>
                                <MenuItem {...item} />
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </section>
    )
}