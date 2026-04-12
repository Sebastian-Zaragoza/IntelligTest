import { Link } from "react-router-dom";

export default function PrivacyPolicyView() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-400">Last updated: April 12, 2026</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-10 space-y-8 text-gray-700 text-sm leading-relaxed">

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to IntelligTest. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website at <span className="font-medium text-gray-900">intelligtest.com</span> and all related services.
                        </p>
                        <p>
                            Please read this policy carefully. If you disagree with its terms, please discontinue use of the platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            2. Information We Collect
                        </h2>
                        <p>We collect information you provide directly to us when you:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li>Create an account (name, email address, password)</li>
                            <li>Sign in using a third-party provider such as Google</li>
                            <li>Upload notes or study material to the platform</li>
                            <li>Generate and complete AI-powered tests</li>
                            <li>Communicate with us for support or feedback</li>
                        </ul>
                        <p>
                            We may also collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and usage patterns within the platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            3. How We Use Your Information
                        </h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li>Create and manage your account</li>
                            <li>Provide, operate, and improve our AI-powered study and testing services</li>
                            <li>Process and analyze your uploaded notes to generate personalized tests</li>
                            <li>Send transactional emails such as account confirmation and password resets</li>
                            <li>Monitor and analyze usage to improve platform performance and user experience</li>
                            <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                        </ul>
                        <p>
                            We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            4. Third-Party Services
                        </h2>
                        <p>
                            IntelligTest integrates with the following third-party services to operate:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li><span className="font-medium text-gray-800">Google OAuth</span> — for optional account sign-in via Google</li>
                            <li><span className="font-medium text-gray-800">Google Cloud Platform</span> — for infrastructure and hosting</li>
                            <li><span className="font-medium text-gray-800">Resend</span> — for transactional email delivery</li>
                            <li><span className="font-medium text-gray-800">MongoDB Atlas</span> — for secure data storage</li>
                            <li><span className="font-medium text-gray-800">OpenAI / AI providers</span> — for generating and evaluating tests based on your notes</li>
                        </ul>
                        <p>
                            Each of these services operates under its own privacy policy. We encourage you to review them.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            5. Data Retention
                        </h2>
                        <p>
                            We retain your personal data for as long as your account is active or as needed to provide you with our services. You may request deletion of your account and associated data at any time by contacting us. Upon deletion, your data will be permanently removed from our systems within 30 days, except where retention is required by law.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            6. Data Security
                        </h2>
                        <p>
                            We implement industry-standard security measures to protect your information, including encrypted communications (HTTPS/TLS), hashed passwords, and access controls within our infrastructure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            7. Your Rights
                        </h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to or restrict our processing of your data</li>
                            <li>Withdraw consent at any time where processing is based on consent</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at the email listed below.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            8. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of the platform after changes are posted constitutes your acceptance of the revised policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            9. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <p className="font-medium text-gray-900">support@intelligtest.com</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
