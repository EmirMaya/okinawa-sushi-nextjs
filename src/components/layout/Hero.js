import Image from 'next/image';
import RightArrow from '@/components/icons/RightArrow';

export default function Hero() {
    return (
        <section className='mt-28 mb-8 lg:my-8 mx-4 lg:ml-14 grid grid-cols-2'>
            <div className='flex flex-col lg:ml-16'>
                <h1
                    className='text-3xl font-semibold text-neutral-800 lg:text-5xl'>
                    La vida mejora cuando comes <span className='text-violet-500'>
                        sushi</span>
                </h1>
                <p className='mt-4 text-neutral-600 text-sm lg:text-lg'>
                    Transforma los tradicionales sabores occidentales en algo fresco y completamente diferente.
                </p>
                <div className='flex gap-4 mt-4'>
                    <button className='flex items-center text-sm gap-1 px-2 py-2 bg-rose-300  rounded-sm lg:text-base hover:bg-rose-500 hover:text-neutral-200'>
                        Pedir
                        <RightArrow />
                    </button>
                    <button className='flex gap-1 items-center text-sm lg:text-base text-neutral-600 font-semibold hover:text-neutral-800'>
                        Acerca de
                        <RightArrow />
                    </button>
                </div>

            </div>

            <div className='relative lg:w-2/3 lg:h-full lg:ml-20'>
                <Image className='lg:border-r-[16px] lg:border-violet-500' src={'/sushi-first.png'} layout={'fill'} alt={'sushi'} objectFit={'contain'} />
            </div>

        </section>
    )
}