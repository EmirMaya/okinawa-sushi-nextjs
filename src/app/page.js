
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';
import Link from 'next/link';

export default function Home() {
  return (
    <>  
      <Hero />
      <HomeMenu />
      <section className='text-center my-16' id='about'>
        <SectionHeaders 
          subHeader={'Nuestra historia'}
          mainHeader={'Acerca nuestro'}
        />

        <div className='text-neutral-600 max-w-2xl md:max-w-full md:mx-10 md:text-base text-center m-4 text-sm flex flex-col justify-center items-center gap-4'>
          <p>
            Bienvenido a Okinawa Sushi, donde la pasión por la auténtica cocina japonesa
            se fusiona con la creatividad y la frescura de los ingredientes.
            Nuestra historia comienza en las pintorescas calles
            de Okinawa, Japón, donde nuestros fundadores, apasionados por la tradición culinaria,
            decidieron compartir la exquisitez de los sabores del sushi con el mundo.
          </p>
          <p>
            Desde nuestros modestos comienzos en una pequeña tienda local hasta convertirnos
            en un destino culinario reconocido, cada plato que servimos cuenta una historia de
            dedicación y amor por la comida. Nos enorgullece ofrecer una experiencia gastronómica única,
            donde la frescura de nuestros ingredientes se combina con la maestría de nuestros chefs
            para brindarte momentos inolvidables en cada bocado.
          </p>

        </div>
      </section>
      <section className='my-6 text-center' id='contact'>
        <SectionHeaders
          subHeader={'No te olvides de'}
          mainHeader={'Contactarnos'}
        />
        <Link className='mt-4 text-xl font-semibold lg:text-3xl text-rose-500' href='https://web.whatsapp.com/'>
          +54 2604376681
        </Link>
      </section>

    
    </>


  )
}
