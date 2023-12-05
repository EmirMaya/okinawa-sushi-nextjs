import { useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [price, setPrice] = useState(menuItem?.price || '');
    const [sizes, setSizes] = useState([]);

    const addSize = () => {
        setSizes(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }];
        });
    }

    const editSize = (e, index, prop) => {
        const newValue = e.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    return (
        <form onSubmit={e => onSubmit(e, { image, name, description, price })}>
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
                    <div className="flex flex-col bg-neutral-300 p-2 rounded-sm mb-2">
                        <label>Agregar más</label>
                        {sizes?.length > 0 && sizes.map((size, index) => (
                            <div key={index} className="flex justify-center items-center gap-2">
                                <div>
                                    <label>Nombre del tamaño</label>
                                    <input
                                        type="text"
                                        placeholder="Size name"
                                        value={size.name}
                                        onChange={e => editSize(e, index, 'name')}
                                    />
                                </div>
                                <div>
                                    <label>Precio extra</label>
                                    <input
                                        type="text"
                                        placeholder="Extra price"
                                        value={size.price}
                                        onChange={e => editSize(e, index, 'price')}
                                    />
                                </div>
                                <div className="mt-2">
                                    <button className="bg-white p-2 rounded-sm">
                                        x
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSize}
                            className="bg-white py-2 px-4 rounded-sm"
                        >
                            Agregar adicional item
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    className='mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                >
                    Editar
                </button>
            </div>
        </form>
    )
}