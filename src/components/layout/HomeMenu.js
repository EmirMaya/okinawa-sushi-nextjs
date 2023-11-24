import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';


export default function HomeMenu() {
    return (
        <section className='mt-6 mx-4'>
            <div className='text-center'>
                <SectionHeaders subHeader={'Chek out'} mainHeader={'Menú'} />
            </div>

            <div className='my-4 grid grid-cols-2 gap-4'>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>

        </section>
    )
}