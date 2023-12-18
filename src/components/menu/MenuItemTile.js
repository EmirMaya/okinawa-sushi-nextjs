import Image from "next/image";

export default function MenuItemTile({onAddToCart, ...item}) {
const {image, name, description, price, sizes} = item;

    return (
        <div className='bg-neutral-50 shadow-md hover:border hover:shadow-lg flex flex-col justify-center rounded-sm text-center'>
            <Image className='w-full h-56 object-cover' src={image} width={500} height={500} alt={name} />
            <div className='p-4'>
                <h4 className='text-violet-500 font-semibold my-2'>{name}</h4>
                <p className='text-neutral-600 text-xs md:text-sm mt-4 line-clamp-3'>{description}</p>
                <p className='font-semibold text-xs text-neutral-700 my-2 md:text-base'>$ {price}</p>
                <button
                    type='button'
                    onClick={onAddToCart}
                    className='text-xs md:text-base px-2 py-2 mt-4 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'>
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}