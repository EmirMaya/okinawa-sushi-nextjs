'use client';
import { useProfile } from "@/components/UseProfile";
import UserLinks from "@/components/layout/UserLinks";

export default function MenuItemsPage() {
    const { loading: profileLoading, data: profileData } = useProfile();


    if (profileLoading) {
        return 'Loding Info...'
    }

    if (!profileData.admin) {
        return 'No eres admin';
    }

    return (
        <section className="my-8 mx-4 ">
            <UserLinks isAdmin={profileData.admin} />
            <form>
                <div className="flex items-center justify-center gap-2 ">
                    <div>
                        image
                    </div>
                    <div className="grow">
                        <label>Nombre del item</label>
                        <input type="text" />
                        <label>Descripción</label>
                        <input type="text" />
                        <label>Precio base</label>
                        <input type="text" />
                    </div>

                </div>
                <div>
                    <button
                        type='submit'
                        className='mt-2 text-sm px-5 py-3 bg-rose-300  rounded-sm hover:bg-rose-500 hover:text-neutral-200'
                    >
                        Crear
                    </button>
                </div>

            </form>
        </section>
    )
}