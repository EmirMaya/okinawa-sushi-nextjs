import { useEffect, useState } from "react";
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [price, setPrice] = useState(menuItem?.price || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '')
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return (
        <form onSubmit={e => onSubmit(e, { image, name, description, price, sizes, category })}>
            <div className="flex items-center justify-center gap-2 ">
                <div className="grow">
                    <label>Nombre del item</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <label>Categoría</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Seleccionar categoría</option>
                        {categories?.length > 0 && categories?.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <label>Precio base</label>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <label>Url de la imagen</label>
                    <input
                        type="text"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                    <MenuItemPriceProps name={'Cantidades'} addLabel={'Agregar cantidades'} props={sizes} setProps={setSizes} />
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    className='w-full text-base after:mt-2 mt-2 px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                >
                    Guardar
                </button>
            </div>
        </form >
    )
}