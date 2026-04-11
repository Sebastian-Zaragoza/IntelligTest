import {Outlet} from "react-router";
import {Toaster} from "sonner";

export default function AuthLayout() {
    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center p-4 font-inter"
                style={{
                    backgroundImage: "url('/resources/abstract-background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden border border-white/30 shadow-2xl">

                    {/* Left panel — fixed decorative side */}
                    <div className="hidden lg:flex relative w-[420px] shrink-0 min-h-[640px] flex-col">
                        <img
                            src="/resources/abstract-background.jpg"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />

                        {/* Top label */}
                        <div className="relative z-10 p-6 flex items-center gap-2">
                            <img src="/Logo.png?v=5" alt="IntelligTest" className="w-7 h-7" />
                            <span
                                className="text-white/80 text-xs font-semibold tracking-widest uppercase"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                IntelligTest
                            </span>
                        </div>

                        {/* Bottom headline */}
                        <div className="relative z-10 mt-auto p-8">
                            <h2
                                className="text-white text-[2.2rem] font-bold leading-tight"
                                style={{fontFamily: "'Playfair Display', serif"}}
                            >
                                Transform Your Notes into Powerful AI Generated Exams
                            </h2>
                            <p className="text-white/60 text-sm mt-3 leading-relaxed">
                                Test yourself without it begin boring
                            </p>
                        </div>
                    </div>

                    {/* Right panel — auth forms render here via React Router Outlet */}
                    <div className="flex-1 bg-white flex flex-col min-h-[640px]">

                        <Outlet />
                    </div>

                </div>
            </div>
            <Toaster />
        </>
    );
}
