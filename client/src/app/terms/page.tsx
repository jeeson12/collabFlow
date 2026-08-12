import Link from "next/link";
import { FolderKanban } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9]">
      <header className="sticky top-0 z-50 w-full border-b border-[#063325]/10 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <FolderKanban className="size-6 text-[#063325]" />
            <span className="text-xl font-serif font-bold tracking-tight text-[#063325]">
              CollabFlow
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#063325] transition-opacity hover:opacity-60 block"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#063325] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-black/5">
          <h1 className="text-4xl font-serif font-bold text-[#063325] mb-4">CollabFlow Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">
            Effective Date: August 12, 2026 | Last Updated: August 12, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-8">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              These Terms of Service ("Terms") govern your access to and use of CollabFlow (the "Service").
              <br /><br />
              By creating an account, accessing, or using CollabFlow, you agree to these Terms. If you do not agree with these Terms, you must not use the Service.
            </p>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">1. Eligibility</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You must be at least 18 years old, or the age of legal majority applicable in your jurisdiction, to use CollabFlow unless applicable law permits otherwise.
                <br /><br />
                If you use CollabFlow on behalf of a company, organization, or other legal entity, you represent that you have authority to accept these Terms on its behalf.
                <br /><br />
                You are responsible for ensuring that your use of CollabFlow complies with all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">2. Account Registration and Security</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Certain features of CollabFlow require an account. Accounts may be created using supported authentication methods, including email/password and third-party authentication providers such as Google.
                <br /><br />
                You agree to provide accurate information when creating your account and to keep your account information reasonably up to date.
                <br /><br />
                You are responsible for:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Maintaining the confidentiality of your account credentials.</li>
                <li>Protecting access to your account.</li>
                <li>All activity performed through your account.</li>
                <li>Immediately notifying us if you believe your account has been compromised.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We are not responsible for losses resulting from your failure to properly secure your account, except where liability cannot legally be excluded.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">3. The Service</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow is a project-management and team-collaboration platform that may provide features including:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Workspaces</li>
                <li>Projects</li>
                <li>Project members</li>
                <li>Tasks</li>
                <li>Kanban boards</li>
                <li>Task assignments</li>
                <li>Comments</li>
                <li>Mentions</li>
                <li>Notifications</li>
                <li>Activity history</li>
                <li>File uploads and attachments</li>
                <li>User profiles</li>
                <li>Email invitations</li>
                <li>Password recovery</li>
                <li>Project analytics</li>
                <li>Other collaboration and productivity features</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We may add, modify, restrict, suspend, or discontinue features at any time. We do not guarantee that any particular feature will remain available indefinitely.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">4. User Content</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                "User Content" means information, files, documents, comments, tasks, messages, images, project information, profile information, and other material submitted, uploaded, created, or stored through CollabFlow.
              </p>
              
              <h3 className="text-xl font-bold text-[#063325] mt-6 mb-2">4.1 Ownership</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You retain ownership of your User Content. CollabFlow does not claim ownership of your User Content.
              </p>

              <h3 className="text-xl font-bold text-[#063325] mt-6 mb-2">4.2 Permission to Operate the Service</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By submitting User Content, you grant CollabFlow a limited, non-exclusive, worldwide, royalty-free license to host, store, process, reproduce, transmit, and display that content only as reasonably necessary to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Provide the Service;</li>
                <li>Maintain the Service;</li>
                <li>Secure the Service;</li>
                <li>Prevent abuse and fraud;</li>
                <li>Troubleshoot technical problems; and</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                This does not transfer ownership of your User Content to CollabFlow.
              </p>

              <h3 className="text-xl font-bold text-[#063325] mt-6 mb-2">4.3 Responsibility for Content</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You are solely responsible for your User Content. You represent that you have the necessary rights and permissions to upload, store, share, or otherwise use your User Content through CollabFlow.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">5. Acceptable Use</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You must not use CollabFlow to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Violate applicable laws or regulations.</li>
                <li>Infringe copyrights, trademarks, patents, privacy rights, or other rights of third parties.</li>
                <li>Upload malware, viruses, ransomware, spyware, trojans, or other malicious software.</li>
                <li>Attempt to gain unauthorized access to accounts, systems, databases, or infrastructure.</li>
                <li>Circumvent authentication, security controls, access restrictions, or rate limits.</li>
                <li>Conduct unauthorized vulnerability scanning or penetration testing.</li>
                <li>Interfere with the operation or availability of CollabFlow.</li>
                <li>Conduct phishing, fraud, scams, or deceptive activities.</li>
                <li>Send spam or unauthorized bulk communications.</li>
                <li>Impersonate another person or organization.</li>
                <li>Upload or distribute unlawful or fraudulent content.</li>
                <li>Use the Service to violate another person's privacy or legal rights.</li>
                <li>Abuse automated systems or otherwise overload the Service.</li>
                <li>Reverse engineer, decompile, or attempt to obtain source code from the Service except where permitted by applicable law.</li>
                <li>Use unauthorized methods to scrape, copy, extract, or reproduce data from CollabFlow.</li>
                <li>Use CollabFlow to facilitate activities that could reasonably cause harm to other users or the Service.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We reserve the right to investigate suspected violations and take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">6. Compliance With Applicable Indian Law</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow operates in accordance with applicable laws and regulations, including, where applicable, the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended from time to time.
                <br /><br />
                Where applicable to the Service, CollabFlow may maintain and publish appropriate rules, policies, and mechanisms relating to user conduct, privacy, content restrictions, complaints, and grievance handling.
                <br /><br />
                Users are responsible for ensuring that information they upload, transmit, store, or share through CollabFlow complies with applicable law and does not infringe the rights of others.
                <br /><br />
                CollabFlow may restrict, remove, suspend, or otherwise take appropriate action concerning content or accounts where required by applicable law, valid legal process, or these Terms.
                <br /><br />
                Nothing in these Terms is intended to exclude or limit any mandatory obligation imposed on CollabFlow by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">7. Intellectual Property</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The CollabFlow software, interface, design, branding, logos, documentation, and other materials provided by CollabFlow are owned by or licensed to CollabFlow and are protected by applicable intellectual-property laws.
                <br /><br />
                Except for the limited rights expressly granted by these Terms, no ownership or other rights are transferred to you.
                <br /><br />
                You may not copy, modify, distribute, sell, sublicense, lease, or create derivative works from the Service without appropriate authorization, except where permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">8. Third-Party Services</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow relies on third-party services and infrastructure to provide certain functionality. These may include authentication, hosting, storage, email, database, networking, and other infrastructure providers.
                <br /><br />
                Your use of third-party services may also be subject to their respective terms and policies.
                <br /><br />
                CollabFlow is not responsible for failures, interruptions, changes, security incidents, or availability issues caused exclusively by third-party providers or circumstances outside our reasonable control, to the maximum extent permitted by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">9. Service Availability</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We make reasonable efforts to keep CollabFlow operational, but we do not guarantee uninterrupted availability. The Service may become unavailable because of:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Maintenance;</li>
                <li>Software updates;</li>
                <li>Bugs;</li>
                <li>Infrastructure failures;</li>
                <li>Network failures;</li>
                <li>Security incidents;</li>
                <li>Third-party service failures;</li>
                <li>Cyberattacks;</li>
                <li>Power outages;</li>
                <li>Government actions;</li>
                <li>Natural disasters; or</li>
                <li>Other circumstances outside our reasonable control.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Emergency maintenance may occur without advance notice where reasonably necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">10. Data and Backups</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You acknowledge that no online service can guarantee that information will never be lost, corrupted, altered, or become inaccessible.
                <br /><br />
                You are responsible for maintaining appropriate backups of important User Content where necessary.
                <br /><br />
                To the maximum extent permitted by applicable law, CollabFlow does not guarantee that deleted, corrupted, lost, or inaccessible User Content will always be recoverable. This includes data loss resulting from infrastructure failures, user actions, technical failures, security incidents, or third-party services, subject to applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">11. Security</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We implement reasonable measures intended to protect CollabFlow and information processed through the Service. However, no internet-connected system can be guaranteed to be completely secure.
                <br /><br />
                Security risks may arise from circumstances including:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Compromised credentials;</li>
                <li>Phishing;</li>
                <li>Malware;</li>
                <li>User negligence;</li>
                <li>Unauthorized access;</li>
                <li>Third-party vulnerabilities;</li>
                <li>Network attacks;</li>
                <li>Infrastructure failures; and</li>
                <li>Previously unknown vulnerabilities.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Nothing in these Terms constitutes a guarantee that CollabFlow will be completely secure or immune from security incidents.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">12. Disclaimer of Warranties</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by applicable law, CollabFlow is provided on an "AS IS" and "AS AVAILABLE" basis.
                <br /><br />
                We disclaim all warranties and representations, express, implied, or statutory, to the extent permitted by law, including warranties relating to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Merchantability;</li>
                <li>Fitness for a particular purpose;</li>
                <li>Non-infringement;</li>
                <li>Availability;</li>
                <li>Accuracy;</li>
                <li>Reliability;</li>
                <li>Security; and</li>
                <li>Error-free operation.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We do not guarantee that:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>CollabFlow will always be available;</li>
                <li>The Service will be uninterrupted;</li>
                <li>The Service will be error-free;</li>
                <li>Defects will always be corrected;</li>
                <li>The Service will satisfy every particular requirement;</li>
                <li>Data will never be lost or corrupted; or</li>
                <li>The Service will be completely secure.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Nothing in these Terms excludes rights or warranties that cannot legally be excluded.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">13. Limitation of Liability</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by applicable law, CollabFlow and its owners, operators, employees, contractors, agents, affiliates, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or relating to your use of the Service.
                <br /><br />
                This may include, to the extent permitted by law:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Loss of profits;</li>
                <li>Loss of revenue;</li>
                <li>Loss of business opportunities;</li>
                <li>Loss of goodwill;</li>
                <li>Business interruption;</li>
                <li>Loss or corruption of data;</li>
                <li>Unauthorized access;</li>
                <li>Service interruption;</li>
                <li>Third-party service failures; or</li>
                <li>Other indirect or consequential losses.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                <strong>Maximum Liability:</strong> To the maximum extent permitted by applicable law, the total aggregate liability of CollabFlow arising from or relating to these Terms or the Service will not exceed the greater of:
                <br /><br />
                (a) the amount you paid to CollabFlow for the Service during the twelve months preceding the event giving rise to the claim; or
                <br /><br />
                (b) INR 5,000.
                <br /><br />
                Nothing in these Terms limits liability that cannot legally be limited or excluded.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">14. Indemnification</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless CollabFlow and its owners, operators, employees, contractors, agents, affiliates, and service providers from claims, damages, liabilities, losses, costs, and reasonable legal expenses arising from:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Your User Content;</li>
                <li>Your violation of these Terms;</li>
                <li>Your violation of applicable law;</li>
                <li>Your violation of third-party rights;</li>
                <li>Your misuse of the Service; or</li>
                <li>Activities conducted through your account that violate these Terms or applicable law.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                This obligation does not apply to the extent a claim is caused by conduct for which CollabFlow is legally responsible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">15. Suspension and Termination</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may suspend, restrict, or terminate access to CollabFlow where reasonably necessary, including if:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>You violate these Terms;</li>
                <li>You violate applicable law;</li>
                <li>Your account is involved in fraudulent activity;</li>
                <li>Your activity creates a security risk;</li>
                <li>You attempt unauthorized access;</li>
                <li>You distribute malicious software;</li>
                <li>You infringe third-party rights;</li>
                <li>Your activity threatens the Service or other users; or</li>
                <li>We are legally required to do so.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Where reasonably practicable, we may provide notice before termination or suspension. However, we may take immediate action where necessary to protect the Service, users, infrastructure, or comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">16. Effect of Termination</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                After termination:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Your right to access CollabFlow may immediately cease.</li>
                <li>Your account may be disabled.</li>
                <li>User Content may be deleted, anonymized, or retained according to applicable retention practices.</li>
                <li>Certain information may be retained where required by law or reasonably necessary for security, fraud prevention, dispute resolution, or legitimate operational purposes.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Sections that are intended to survive termination, including intellectual property, disclaimers, liability limitations, indemnification, and governing law, will survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">17. Privacy</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your use of CollabFlow is also subject to our Privacy Policy. The Privacy Policy explains how personal information is collected, used, stored, processed, and disclosed in connection with the Service. The Privacy Policy forms part of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">18. Force Majeure</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, CollabFlow will not be responsible for delays or failures caused by circumstances beyond our reasonable control. These circumstances may include:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Natural disasters;</li>
                <li>War;</li>
                <li>Terrorism;</li>
                <li>Government actions;</li>
                <li>Internet failures;</li>
                <li>Telecommunications failures;</li>
                <li>Power failures;</li>
                <li>Cyberattacks;</li>
                <li>Infrastructure failures;</li>
                <li>Labor disputes;</li>
                <li>Third-party service failures; or</li>
                <li>Other events beyond our reasonable control.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">19. Changes to the Service</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may modify, suspend, or discontinue any part of CollabFlow at any time. We may introduce new features, remove existing features, change functionality, or modify technical requirements. Where reasonably appropriate, we may provide notice of material changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">20. Changes to These Terms</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may update these Terms from time to time. When changes are material, we may provide reasonable notice through the Service, email, or another appropriate method.
                <br /><br />
                The updated Terms will become effective on the stated effective date. Your continued use of CollabFlow after the effective date constitutes acceptance of the updated Terms to the extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">21. Governing Law</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                These Terms are governed by the laws of India, subject to any mandatory legal rights that may apply to you. Any disputes relating to these Terms or CollabFlow will be subject to the jurisdiction of the courts having appropriate jurisdiction under applicable Indian law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">22. Severability</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, that provision will be modified or limited to the minimum extent necessary where legally possible. The remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">23. No Waiver</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our failure to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision later.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">24. Entire Agreement</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                These Terms and the Privacy Policy constitute the agreement governing your use of CollabFlow, except where a separate written agreement applies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">25. Electronic Communications</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                By using CollabFlow, you agree that we may communicate with you electronically regarding:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Your account;</li>
                <li>Security issues;</li>
                <li>Service updates;</li>
                <li>Legal notices;</li>
                <li>Policy changes;</li>
                <li>Password recovery;</li>
                <li>Invitations; and</li>
                <li>Other matters relating to the Service.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                You are responsible for keeping your account email address reasonably current.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">26. Contact</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For questions regarding these Terms, privacy, security, or the Service:<br /><br />
                <strong>Email:</strong> collabflow.web@gmail.com
                <br /><br />
                No residential address or other personal contact information is included in this public Terms document.
              </p>
            </section>

          </div>
        </div>
      </main>

      <footer className="border-t border-[#063325]/10 bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © 2026 CollabFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
