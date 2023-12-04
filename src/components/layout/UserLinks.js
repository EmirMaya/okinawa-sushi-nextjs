'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserLinks = ({ isAdmin }) => {
    const path = usePathname();
    return (
        <div className="flex justify-center mb-4 gap-2 tabs">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Mi cuenta
            </Link>
            {isAdmin && (
                <>
                    <Link
                        className={path === '/categories' ? 'active' : ''}
                        href={'/categories'}
                    >
                        Categorías
                    </Link>
                    <Link
                        className={path.includes('menu-items') ? 'active' : ''}
                        href={'/menu-items'}
                    >
                        Menu
                    </Link>
                    <Link
                        className={path === '/users' ? 'active' : ''}
                        href={'/users'}
                    >
                        Usuarios
                    </Link>
                </>
            )}
        </div>
    )

}

export default UserLinks;