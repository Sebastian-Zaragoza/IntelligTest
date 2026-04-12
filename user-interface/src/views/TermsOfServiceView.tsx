import { Link } from "react-router-dom";

export default function TermsOfServiceView() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Header */}
                <div className="mb-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-6"
                    >
                        ← Back to IntelligTest
                    </Link>
                    <h1
                        className="text-4xl font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Terms of Service
                    </h1>
                    <p className="text-sm text-gray-400">Last updated: April 12, 2026</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-10 space-y-8 text-gray-700 text-sm leading-relaxed">

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using IntelligTest at <span className="font-medium text-gray-900">intelligtest.com</span>, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use the platform.
                        </p>
                        <p>
                            These terms apply to all users of the platform, including visitors, registered users, and anyone else who accesses or uses the service.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            2. Description of Service
                        </h2>
                        <p>
                            IntelligTest is an AI-powered study platform that allows users to upload notes and study materials, generate personalized tests based on those materials, and receive AI-evaluated feedback on their answers. The service is designed for educational and personal study purposes.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            3. User Accounts
                        </h2>
                        <p>
                            To access most features of IntelligTest, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li>Provide accurate, complete, and current information during registration</li>
                            <li>Maintain the security of your password and account credentials</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Accept responsibility for all activities that occur under your account</li>
                        </ul>
                        <p>
                            We reserve the right to suspend or terminate accounts that violate these terms or that we reasonably believe are being misused.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            4. Acceptable Use
                        </h2>
                        <p>You agree not to use IntelligTest to:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li>Upload content that is unlawful, harmful, abusive, defamatory, or otherwise objectionable</li>
                            <li>Infringe upon the intellectual property rights of others</li>
                            <li>Attempt to gain unauthorized access to any part of the platform or its infrastructure</li>
                            <li>Interfere with or disrupt the integrity or performance of the service</li>
                            <li>Use automated scripts or bots to interact with the platform without prior written consent</li>
                            <li>Reverse-engineer, decompile, or attempt to extract the source code of the platform</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            5. User Content
                        </h2>
                        <p>
                            You retain ownership of any notes, materials, or content you upload to IntelligTest. By uploading content, you grant us a limited, non-exclusive license to process and use that content solely for the purpose of providing the service to you — specifically, to extract text, generate questions, and evaluate your answers.
                        </p>
                        <p>
                            You are solely responsible for the content you upload. You warrant that you have the right to upload such content and that it does not violate any applicable law or third-party rights.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            6. AI-Generated Content
                        </h2>
                        <p>
                            The tests and feedback generated by IntelligTest are produced using artificial intelligence. While we strive for accuracy, AI-generated content may contain errors, omissions, or inaccuracies. IntelligTest does not guarantee the correctness, completeness, or fitness for any particular purpose of AI-generated questions or evaluations.
                        </p>
                        <p>
                            AI-generated content should be used as a supplementary study tool and not as a sole source of truth for academic or professional purposes.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            7. Intellectual Property
                        </h2>
                        <p>
                            All elements of the IntelligTest platform — including its design, logo, codebase, and AI models — are the exclusive property of IntelligTest and are protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from any part of the platform without our express written permission.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            8. Disclaimer of Warranties
                        </h2>
                        <p>
                            IntelligTest is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the platform is at your sole risk.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            9. Limitation of Liability
                        </h2>
                        <p>
                            To the fullest extent permitted by law, IntelligTest and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            10. Changes to These Terms
                        </h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by updating the date at the top of this page. Continued use of the platform after changes are posted constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            11. Governing Law
                        </h2>
                        <p>
                            These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising from these terms or your use of the platform shall be resolved through good-faith negotiation or, if necessary, through the appropriate legal channels.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            12. Contact Us
                        </h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="font-medium text-gray-900">support@intelligtest.com</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
