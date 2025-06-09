import {Outlet } from "react-router";
import {Toaster} from "sonner";
import Logo from "../components/Logo.tsx";
import NavMenu from "../components/section/NavMenu.tsx";


export default function SectionLayout() {
    /**const { isError, isLoading, data } = useAuth();
    if (isLoading) {
        return <div className="bg-gray-800 min-h-screen" />;
    }
    if (isError || !data) {
        return <Navigate to="/auth/login" replace />;
    }**/
    return (
        <>
            <header className="bg-gray-800">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-20 py-4">
                    <div className="flex justify-between items-center">
                        <Logo/>
                        <h1 className="text-center font-semibold text-white ">IntelligTest</h1>
                    </div>
                    <NavMenu name={"Zaragoza"} />
                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 px-20">
                <Outlet />
            </section>

            <footer>
                <div className="max-w-screen-2xl mx-auto px-20 py-5">
                    <p className="text-center text-gray-600">
                        All rights reserved {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
            <Toaster/>
        </>
    );
}
