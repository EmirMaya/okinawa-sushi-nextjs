'use client';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from '@/components/menu/MenuItemTile';

export default function MenuItem(menuItem) {
    const {
        image, name, description, price,
        sizes,
    } = menuItem;
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);

    const handleAddToCartClick = () => {
        if (sizes.length === 0) {
            addToCart(menuItem);
            toast.success('¡Agregado al carrito!')
        } else {
            setShowPopup(true);
        }
    }

    return (
        <>
            {showPopup && (
                <div className='fixed inset-0 bg-black/80 flex justify-center items-center '>
                    <div className='bg-white p-4 rounded-sm'>
                        <Image src={image} alt={name} width={300} height={200} />
                        <h2 className='text-center font-bold'>{name}</h2>
                        <p>{description}</p>
                        {sizes?.length > 0 && (
                            <div>
                                <h3>Agregar más piezas</h3>
                                {sizes.map((size, index) => (
                                    <label key={index} className='block py-1 flex items-center gap-2'>
                                        <input type='radio' />
                                        {size.name}   $ {price + size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartClick} {...menuItem} />
        </>

    )
}