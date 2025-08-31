import {Outlet } from "react-router";
import {Toaster} from "sonner";
import Logo from "../components/Logo.tsx";
import NavMenu from "../components/section/NavMenu.tsx"
import {useAuth} from "../hooks/useAuth.ts";

export default function SectionLayout() {
    const { isError, isLoading, data } = useAuth();
    
    if (isLoading) {
        return <div className="bg-gray-800 min-h-screen" />;
    }
    
    if (isError || !data) {
        if (isError) {
            localStorage.removeItem("IntelligTestToken");
        }
        window.location.href = '/auth/login';
        return null;
    }
    
    return (
        <div className="min-h-screen bg-gray-800 flex flex-col">
            <header className="bg-gray-800 shadow-md">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <Logo />
                        <span className="text-xl font-semibold text-white">IntelligTest</span>
                    </div>
                    <NavMenu name="Zaragoza" />
                </div>
            </header>

            <main className="flex-grow max-w-screen-2xl mx-auto px-8 py-10">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <Outlet />
                </div>
            </main>

            <footer className="py-4">
                <div className="max-w-screen-2XL mx-auto px-8 text-center">
                    <p className="text-sm text-gray-400">
                        All rights reserved {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
            <Toaster/>
        </div>
    );
}
