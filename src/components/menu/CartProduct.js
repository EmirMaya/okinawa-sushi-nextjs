import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product, onRemove, index}) {
    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="w-24">
                <Image width={240} height={240} src={product.image} alt={''} />
            </div>
            <div className="grow">
                <h3 className="font-semibold text-sm">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm">
                        Size: <span>{product.size.name}</span>
                    </div>
                )}

            </div>
            <div className="text-sm font-semibold">
                ${cartProductPrice(product)}
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="p-2 w-1/2"
                    >
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    );
}