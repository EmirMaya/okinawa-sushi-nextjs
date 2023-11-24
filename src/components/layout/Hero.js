import Image from 'next/image';
import RightArrow from '@/components/icons/RightArrow';

export default function Hero() {
    return (
        <section className='mt-8 grid grid-cols-2'>
            <div className='ml-3'>
                <h1 className='text-3xl font-semibold text-neutral-800'>La vida mejora cuando comes <span className='text-violet-500'>sushi</span></h1>
                <p className='mt-4 text-neutral-600 text-sm'>
                    Cambia los sabores occidentales  clásicos
                    por algo más fresco y diferente
                </p>
                <div className='flex gap-4 mt-4'>
                    <button className='flex items-center text-sm gap-1 px-2 py-2 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'>
                        Pedir
                        <RightArrow />
                    </button>
                    <button className='flex gap-1 items-center text-sm  text-neutral-600 font-semibold hover:text-neutral-800'>
                        Acerca de
                        <RightArrow />
                    </button>
                </div>

            </div>

            <div className='relative'>
                <Image src={'/sushi-first.png'} layout={'fill'} alt={'sushi'} objectFit={'contain'} />
            </div>

        </section>
    )
}