export default function SectionHeaders({ subHeader, mainHeader }) {
    return (
        <>
            <h3 className='uppercase text-neutral-600 font-semibold'>
                {subHeader}
            </h3>
            <h2 className='text-violet-500 font-bold text-4xl'>
                {mainHeader}
            </h2>
        </>
    )
}