import { Link } from "react-router-dom";

export default function LandingView() {
    return (
        <div className="min-h-screen bg-gray-50 font-inter">

            {/* Hero header — background image with overlay */}
            <header className="relative h-[480px] flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/resources/abstract-background.jpg')" }}
                />
                <div className="absolute inset-0 bg-gray-900/70" />

                <div className="relative z-10 px-6 space-y-4">
                    <h1
                        className="text-5xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        IntelligTest
                    </h1>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto">
                        Test yourself without it begin boring
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-2">
                        <Link
                            to="/auth/register"
                            className="bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-md hover:bg-gray-100 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/auth/login"
                            className="text-white text-sm font-medium border border-white/40 px-6 py-3 rounded-md hover:bg-white/10 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            {/* What is IntelligTest */}
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h2
                    className="text-3xl font-bold text-gray-900 mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    What is IntelligTest?
                </h2>
                <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
                    IntelligTest is an AI-powered study platform designed to help students and professionals
                    learn more effectively. You upload photos of your notes or study materials, and our AI
                    automatically generates personalized tests based on your content. After you complete
                    the test, the AI reviews your answers and provides detailed, question-by-question feedback
                    — so you know exactly where you stand and what to review next.
                </p>
            </section>

            {/* How it works */}
            <section className="bg-white border-y border-gray-100 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h2
                        className="text-3xl font-bold text-gray-900 text-center mb-12"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        How It Works
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-8">

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                                <span
                                    className="text-white text-lg font-bold"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    1
                                </span>
                            </div>
                            <div>
                                <h3
                                    className="text-base font-bold text-gray-900 mb-1"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Upload Your Notes
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Take a photo of your handwritten or printed notes and upload it to your section.
                                    Our AI extracts and understands the content automatically.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                                <span
                                    className="text-white text-lg font-bold"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    2
                                </span>
                            </div>
                            <div>
                                <h3
                                    className="text-base font-bold text-gray-900 mb-1"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Generate a Personalized Test
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    With one click, IntelligTest generates a set of questions tailored specifically
                                    to your notes. No templates, no generic questions — your material, your test.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                                <span
                                    className="text-white text-lg font-bold"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    3
                                </span>
                            </div>
                            <div>
                                <h3
                                    className="text-base font-bold text-gray-900 mb-1"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Get AI Feedback
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Submit your answers and receive instant, detailed feedback on every question.
                                    Understand what you got right, what needs work, and why.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <h2
                    className="text-3xl font-bold text-gray-900 text-center mb-12"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Why IntelligTest?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        {
                            title: "AI-Generated Questions",
                            body: "Every test is unique and built from your own notes, ensuring the questions are directly relevant to what you're studying.",
                        },
                        {
                            title: "Strict & Flexible Modes",
                            body: "Choose strict mode for exact-answer evaluation, or flexible mode for more lenient AI scoring — adapt the test to your study goals.",
                        },
                        {
                            title: "Organized by Section",
                            body: "Keep your subjects organized in separate sections. Each section has its own notes and test, so nothing gets mixed up.",
                        },
                        {
                            title: "Instant, Detailed Feedback",
                            body: "The AI doesn't just tell you right or wrong — it explains each answer so you can build a deeper understanding of the material.",
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-6 space-y-2"
                        >
                            <h3
                                className="text-base font-bold text-gray-900"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-16 text-center">
                <div className="max-w-xl mx-auto px-6 space-y-4">
                    <h2
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Ready to study smarter?
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Create a free account and turn your first set of notes into a test in under a minute.
                    </p>
                    <Link
                        to="/auth/register"
                        className="inline-block bg-white text-gray-900 font-semibold text-sm px-8 py-3 rounded-md hover:bg-gray-100 transition mt-2"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} IntelligTest. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-xs text-gray-400">
                        <Link to="/privacy-policies" className="hover:text-gray-700 hover:underline transition">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="hover:text-gray-700 hover:underline transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>

        </div>
    );
}
