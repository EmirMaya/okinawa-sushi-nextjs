import Image from "next/image";

export default function MenuItemTile({onAddToCart, ...item}) {
const {image, name, description, price, sizes} = item;

    return (
        <div className='bg-neutral-50 hover:border hover:shadow-lg flex flex-col justify-center rounded-sm text-center shadow-sm'>
            <Image className='w-full' src={image} width={'100'} height={'100'} alt={'niguiri'} />
            <div className='p-4'>
                <h4 className='text-violet-500 font-semibold my-2'>{name}</h4>
                <p className='text-neutral-600 text-xs line-clamp-3'>{description}</p>
                <p className='font-semibold text-xs text-neutral-700 my-2'>$ {price}</p>
                <button
                    type='button'
                    onClick={onAddToCart}
                    className='text-xs px-2 py-2 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'>
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}