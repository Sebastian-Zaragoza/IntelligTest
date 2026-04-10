import {Outlet} from "react-router";
import {Toaster} from "sonner";
import NavMenu from "../components/section/NavMenu.tsx"
import {useAuth} from "../hooks/useAuth.ts";

export default function SectionLayout() {
    const { isError, isLoading, data } = useAuth();

    if (isLoading) {
        return <div className="bg-gray-50 min-h-screen" />;
    }

    if (isError || !data) {
        if (isError) {
            localStorage.removeItem("IntelligTestToken");
        }
        window.location.href = '/auth/login';
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">

            <header className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 py-4">
                    <div className="flex items-center gap-3">
                        <img src="/Logo.png" alt="IntelligTest" className="w-8 h-8" />
                        <span
                            className="text-sm font-bold text-gray-800"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            IntelligTest
                        </span>
                    </div>
                    <NavMenu name="Zaragoza" />
                </div>
            </header>

            <main className="flex-grow max-w-screen-2xl mx-auto w-full px-8 py-10">
                <Outlet />
            </main>

            <footer className="py-5 border-t border-gray-100">
                <div className="max-w-screen-2xl mx-auto px-8 text-center">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} IntelligTest. All rights reserved.
                    </p>
                </div>
            </footer>

            <Toaster />
        </div>
    );
}
