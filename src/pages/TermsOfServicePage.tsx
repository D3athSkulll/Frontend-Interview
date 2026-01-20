/**
 * TermsOfServicePage Component
 * 
 * Static page displaying terms of service.
 */
export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl text-left">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <div className="space-y-6">
                <p className="text-muted-foreground">
                    Last updated: January 21, 2026
                </p>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        By accessing or using CA Monk's services, you agree to be bound by these Terms of Service
                        and all applicable laws and regulations. If you do not agree with any of these terms,
                        you are prohibited from using our services.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">2. Use License</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        Permission is granted to temporarily access the materials on CA Monk's website for
                        personal, non-commercial use only. This is the grant of a license, not a transfer of
                        title, and under this license you may not modify, copy, or distribute the materials
                        for commercial purposes.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">3. User Content</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        Users may post content on the platform. You retain ownership of your content but grant
                        CA Monk a license to use, display, and distribute it. You are responsible for ensuring
                        your content does not violate any laws or infringe on others' rights.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">4. Disclaimer</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        The materials on CA Monk's website are provided on an 'as is' basis. CA Monk makes no
                        warranties, expressed or implied, and hereby disclaims all other warranties including,
                        without limitation, implied warranties of merchantability or fitness for a particular purpose.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">5. Limitations</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        In no event shall CA Monk be liable for any damages arising out of the use or inability
                        to use the materials on our website, even if CA Monk has been notified of the possibility
                        of such damage.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">6. Contact</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        For any questions regarding these Terms of Service, please contact us at legal@camonk.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
