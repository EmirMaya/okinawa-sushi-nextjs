import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || ''); // Inicializa con el valor del teléfono si está disponible, de lo contrario, usa una cadena vacía
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [userImage, setUserImage] = useState(user?.image || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();


    return (
        <div className='flex gap-2 items-start justify-center w-full'>
            <EditableImage link={userImage} setLink={setUserImage} />
            <form className="w-full " onSubmit={e => onSave(e, { name: userName, userImage, phone, streetAddress, admin })}>
                <label>Usuario</label>
                <input type='text' value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nombre y Apellido" />
                <label>Email</label>
                <input type='email' disabled={true} value={user?.email} />
                <label>Teléfono</label>
                <input type="tel" placeholder="N° Teléfono"
                    value={phone} onChange={e => setPhone(e.target.value)}
                />
                <label>Dirección</label>
                <input type="text" placeholder="Dirección"
                    value={streetAddress} onChange={e => setStreetAddress(e.target.value)}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 block inline-flex items-center gap-2 my-2" htmlFor='adminCb'>
                            <input
                                id='adminCb'
                                type="checkbox"
                                value={'1'}
                                checked={admin}
                                onClick={e => setAdmin(e.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button
                    className='bg-rose-300 px-4 py-2 rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                    type="submit"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}