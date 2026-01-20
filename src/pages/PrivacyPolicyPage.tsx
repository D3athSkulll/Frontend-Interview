/**
 * PrivacyPolicyPage Component
 * 
 * Static page displaying privacy policy.
 */
export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl text-left">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <div className="space-y-6">
                <p className="text-muted-foreground">
                    Last updated: January 21, 2026
                </p>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        We collect information you provide directly to us, such as when you create an account,
                        submit content, participate in forums, or contact us for support. This may include your
                        name, email address, and any other information you choose to provide.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        We use the information we collect to provide, maintain, and improve our services,
                        communicate with you about updates and promotional offers, and protect against fraudulent
                        or illegal activity.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">3. Information Sharing</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        We do not share your personal information with third parties except as described in this
                        policy. We may share information with service providers who perform services on our behalf,
                        or when required by law.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">4. Data Security</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        We take reasonable measures to help protect your personal information from loss, theft,
                        misuse, unauthorized access, disclosure, alteration, and destruction.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">5. Contact Us</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        If you have any questions about this Privacy Policy, please contact us at
                        privacy@camonk.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
