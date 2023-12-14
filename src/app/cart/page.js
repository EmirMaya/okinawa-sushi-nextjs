'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";
import SectionHeaders from "@/components/layout/SectionHeaders";
import AddressInputs from '@/components/layout/AddressInputs';

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('candeled=1')) {
                toast.error('Pago fallido 😔');
            }
        }
    }, []);

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress } = profileData;
            const profileAddress = {
                phone, streetAddress
            }
            setAddress(profileAddress);
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        console.info('carts product price', cartProductPrice(p))
        subtotal += cartProductPrice(p);
    }
    const handleAddressChange = (propName, value) => {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    const proceedToCheckout = async (e) => {
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparando tu orden...',
            success: 'Redirigiendo al pago...',
            error: 'Error, intenta de nuevo',
        });
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="my-8 text-center">
                <SectionHeaders mainHeader='Carrito' />
                <p className="mt-4">Tu carrito está vacío</p>
            </section>
        )
    }


    return (
        <section className="my-8 mx-4">
            <div className='text-center'>
                <SectionHeaders mainHeader='Carrito' />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <p>No hay productos en tu carrito</p>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            index={index}
                            product={product}
                            onRemove={removeCartProduct}
                        />
                    ))}
                    <div className='py-2 flex justify-start items-center'>
                        <div className="text-neutral-500">
                            Subtotal: <br />
                            Delivery: <br />
                            Total:
                        </div>
                        <div className="font-semibold py-2 text-left">
                            ${subtotal} <br />
                            $5<br />
                            ${subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-100 p-4 rounded-sm">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}