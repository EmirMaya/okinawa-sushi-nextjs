'use client';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from '@/components/menu/MenuItemTile';

export default function MenuItem(menuItem) {
    const {
        image, name, description, price,
        sizes,
    } = menuItem;

    const [
        selectedSize, setSelectedSize
    ] = useState(sizes?.[0] || null);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);

    const handleAddToCartClick = () => {
        if (sizes.length === 0) {
            addToCart(menuItem);
            toast.success(`¡Agregado al carrito! ${menuItem.price}`)
        } else {
            setShowPopup(true);
        }
    }

    const handleAddToCartWithSize = () => {
        if (selectedSize) {
            const itemWithSize = {
                ...menuItem,
                size: selectedSize,
                price: price + selectedSize.price,
            };
            addToCart(itemWithSize);
            toast.success(`¡Agregado al carrito! Precio total: ${itemWithSize.price}`);
            setShowPopup(false);
        }
    }

    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className='fixed inset-0 bg-black/80 flex justify-center items-center z-10'>
                    <div
                        onClick={e => e.stopPropagation()}
                        className='bg-white p-2 rounded-sm max-h-screen '>
                        <div
                            className='overflow-scroll p-2 flex flex-col justify-center text-center'
                            style={{ maxHeight: 'calc(100vh-80px)' }}
                        >
                            <Image className='w-full h-56 object-cover' src={image} alt={name} width={500} height={500} />
                            <h2 className='text-center font-bold mt-4 md:text-lg'>{name}</h2>
                            <p className='text-neutral-600 my-3'>{description}</p>
                            {sizes?.length > 0 && (
                                <div>
                                    <h3 className='text-violet-500 font-semibold'>Agregar más piezas</h3>
                                    {sizes.map((size, index) => (
                                        <label key={index} className='py-1 flex items-center gap-2 md:text-base'>
                                            <input
                                                onChange={() => setSelectedSize(size)}
                                                type='radio'
                                                name='size'
                                            />
                                            {size.name}   $ {size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={handleAddToCartWithSize}
                                className='sticky bottom-2 mt-2 bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200'>
                                Agregar al carrito ${selectedSize ? (selectedSize.price + price) : price}
                            </button>
                            <button className='mt-2 font-semibold text-neutral-600'
                                onClick={() => setShowPopup(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartClick} {...menuItem} />
        </>

    )
}