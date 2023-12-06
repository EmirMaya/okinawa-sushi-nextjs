import { useState } from "react";
import Trash from '@/components/icons/Trash';
import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
    const [isOpen, setIsOpen] = useState(false);

    const addProp = () => {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    const editProp = (e, index, prop) => {
        const newValue = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    const removeProp = index => {
        setProps(prev => prev.filter((v, i) => i !== index));
    }

    return (
        <div className="flex flex-col bg-neutral-300 p-2 rounded-sm mb-2">
            <button type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="py-1 px-2 flex items-center justify-start gap-2 mb-2 ">
                {isOpen && (
                    <ChevronUp />
                )}

                {!isOpen && (
                    <ChevronDown />
                )}
                <label className='text-neutral-700 text-base font-semibold'>{name}</label>
                <span>{props?.length}</span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex justify-center items-center gap-2">
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Size name"
                                value={size.name}
                                onChange={e => editProp(e, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Precio extra</label>
                            <input
                                type="text"
                                placeholder="Extra price"
                                value={size.price}
                                onChange={e => editProp(e, index, 'price')}
                            />
                        </div>
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white p-2 rounded-sm">
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white w-full py-2 px-4 rounded-sm"
                >
                    {addLabel}
                </button>
            </div>

        </div>
    )
}

export default MenuItemPriceProps;