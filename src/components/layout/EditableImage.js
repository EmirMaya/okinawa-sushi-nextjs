import Image from "next/image";
import Camera from "@/components/icons/Camera";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/profile/image', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                return response.json().then(link => {
                    setLink(link);
                });
                toast.success('¡Foto de perfil actualizada!');
            } else {
                toast.success('Error al actualizar la foto de perfil, intenta de nuevo');
            }
        });


    }

    // console.log(link);

    return (
        <div className="p-2 rounded-full flex flex-col items-center gap-2">
            {link && (
                <Image className='rounded-full' src={link} width={64} height={64} alt={'foto de perfil'} />
            )}
            {!link && (
                <div className="text-center bg-gray-200 p-4 text-neutral-500 rounded-lg mb-1">
                    No image
                </div>
            )}
            <label className="rounded-sm py-0.5 px-4 bg-neutral-300 hover:bg-rose-200">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="m-0 p-0">
                    <Camera />
                </span>
            </label>
        </div>
    )
}