'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserLinks = ({ isAdmin }) => {
    const path = usePathname();
    return (
        <div className="flex justify-center items-center mb-4 gap-1 tabs lg:gap-3">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Cuenta
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
                        className={path.includes('/users') ? 'active' : ''}
                        href={'/users'}
                    >
                        Usuarios
                    </Link>
                    <Link
                        className={path === '/orders' ? 'active' : ''}
                        href={'/orders'}
                    >
                        Órdenes
                    </Link>
                </>
            )}
        </div>
    )

}

export default UserLinks;