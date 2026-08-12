import Link from "next/link";
import { FolderKanban } from "lucide-react";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-serif font-bold text-[#063325] mb-4">PRIVACY POLICY</h1>
          <p className="text-sm text-muted-foreground mb-12">
            Effective Date: August 12, 2026 | Last Updated: August 12, 2026
          </p>

          <div className="prose prose-sm prose-slate max-w-none space-y-8">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              This Privacy Policy explains how CollabFlow ("CollabFlow", "we", "us", or "our") collects, uses, stores, and protects information when you use the CollabFlow platform and related services (the "Service").
              <br /><br />
              By using CollabFlow, you acknowledge that you have read and understood this Privacy Policy.
            </p>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">1. INFORMATION WE COLLECT</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We collect only information reasonably necessary to provide, maintain, secure, and improve the Service.
              </p>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">1.1 Account Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you create an account, we may collect:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Password hash</li>
                <li>Profile/avatar information</li>
                <li>Account preferences</li>
                <li>Authentication information</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We do not store your plain-text password.
                <br /><br />
                If you authenticate using Google, we may receive information provided by Google through the authentication process, such as:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Profile information</li>
                <li>Google account identifier</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We do not receive your Google password.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">2. WORKSPACE AND PROJECT INFORMATION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you use CollabFlow, we may process information associated with your workspaces and projects, including:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Workspace names</li>
                <li>Project names</li>
                <li>Project descriptions</li>
                <li>Project keys</li>
                <li>Workspace memberships</li>
                <li>Project memberships</li>
                <li>User roles</li>
                <li>Task information</li>
                <li>Task assignments</li>
                <li>Task priorities</li>
                <li>Task due dates</li>
                <li>Board columns</li>
                <li>Comments</li>
                <li>Mentions</li>
                <li>Notifications</li>
                <li>Activity history</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                This information is processed to provide the collaboration and project-management functionality of CollabFlow.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">3. FILES AND ATTACHMENTS</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow allows users to upload files and attachments.
                <br /><br />
                Uploaded files may include documents, images, and other file types supported by the Service. Files may be stored using third-party cloud-storage infrastructure used by CollabFlow.
                <br /><br />
                You are responsible for ensuring that you have the necessary rights and permissions to upload and share files through CollabFlow. You should not upload sensitive or confidential information unless you have determined that doing so is appropriate for your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">4. TECHNICAL AND SECURITY INFORMATION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you access CollabFlow, our application and infrastructure providers may automatically process technical information necessary to operate and secure the Service. This may include:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Device information</li>
                <li>Request information</li>
                <li>Authentication information</li>
                <li>Security logs</li>
                <li>Error logs</li>
                <li>Service-performance information</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We may use this information to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Maintain the Service;</li>
                <li>Diagnose technical problems;</li>
                <li>Detect suspicious activity;</li>
                <li>Prevent abuse and fraud;</li>
                <li>Protect accounts and infrastructure; and</li>
                <li>Investigate security incidents.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                The exact information collected may vary depending on the device, browser, infrastructure provider, and features you use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">5. COOKIES AND SIMILAR TECHNOLOGIES</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow uses cookies and similar technologies where necessary to provide authentication and maintain secure sessions. For example, authentication cookies may be used to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Keep you signed in;</li>
                <li>Authenticate requests;</li>
                <li>Maintain your session; and</li>
                <li>Protect your account.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                CollabFlow does not use authentication cookies for advertising purposes. Your browser may allow you to control or block cookies. However, disabling essential authentication cookies may prevent certain parts of CollabFlow from functioning correctly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">6. HOW WE USE INFORMATION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may process information for the following purposes.
              </p>
              
              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">6.1 Providing the Service</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We use information to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Create and manage accounts;</li>
                <li>Authenticate users;</li>
                <li>Create and manage workspaces;</li>
                <li>Create and manage projects;</li>
                <li>Manage project memberships;</li>
                <li>Create and assign tasks;</li>
                <li>Process comments and mentions;</li>
                <li>Send notifications;</li>
                <li>Store files;</li>
                <li>Send invitations;</li>
                <li>Provide password recovery; and</li>
                <li>Provide other requested functionality.</li>
              </ul>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">6.2 Security</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may process information to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Protect accounts;</li>
                <li>Detect unauthorized access;</li>
                <li>Prevent fraud;</li>
                <li>Detect malicious activity;</li>
                <li>Investigate security incidents;</li>
                <li>Enforce our Terms of Service; and</li>
                <li>Protect the Service and its users.</li>
              </ul>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">6.3 Service Improvement</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may use technical and aggregated information to understand how the Service performs, diagnose problems, improve reliability, and develop new functionality. Where reasonably possible, information used for analytical or improvement purposes may be aggregated or otherwise de-identified.
              </p>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">6.4 Legal Compliance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may process or disclose information where necessary to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Comply with applicable law;</li>
                <li>Respond to valid legal requests;</li>
                <li>Protect our legal rights;</li>
                <li>Investigate fraud or abuse;</li>
                <li>Protect users or the public; or</li>
                <li>Respond to security incidents.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">7. LEGAL BASIS FOR PROCESSING</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Depending on the circumstances and applicable law, personal data may be processed on the basis of:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Your request to provide the Service;</li>
                <li>Your consent, where consent is required;</li>
                <li>Legitimate or otherwise lawful purposes permitted by applicable law;</li>
                <li>Compliance with legal obligations;</li>
                <li>Prevention of fraud, abuse, and security incidents; or</li>
                <li>Other lawful grounds available under applicable law.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Where consent is relied upon and applicable law provides a right to withdraw consent, you may withdraw it through the mechanisms made available by CollabFlow or by contacting us. Withdrawal of consent does not affect processing that was lawfully carried out before withdrawal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">8. HOW WE SHARE INFORMATION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We do not sell your personal data. We may share or make information available to service providers that help us operate CollabFlow. These providers may process information on our behalf and may include:
              </p>
              
              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">8.1 Hosting and Application Infrastructure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may use infrastructure providers such as: Vercel for application hosting and delivery; Render for backend/application infrastructure.
              </p>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">8.2 Database and File Storage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may use: PostgreSQL/Prisma-based database infrastructure; Supabase for supported storage infrastructure.
              </p>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">8.3 Email Services</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may use: Brevo for transactional emails such as invitations and password-reset emails.
              </p>

              <h3 className="text-lg font-bold text-[#063325] mt-6 mb-2">8.4 Authentication</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may use: Google for Google authentication.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Third-party providers process information according to their respective services and policies. We may also disclose information where required by law, valid legal process, security requirements, or to protect our rights, users, or the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">9. INTERNATIONAL DATA TRANSFERS</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Some infrastructure and service providers used by CollabFlow may process or store information outside India. Where personal data is transferred or processed internationally, CollabFlow will handle such processing subject to applicable legal requirements and any restrictions that may apply to cross-border transfers. We do not guarantee that all information will be stored exclusively within India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">10. DATA RETENTION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We retain information for as long as reasonably necessary to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Provide the Service;</li>
                <li>Maintain your account;</li>
                <li>Provide requested functionality;</li>
                <li>Maintain security;</li>
                <li>Prevent fraud and abuse;</li>
                <li>Resolve disputes;</li>
                <li>Comply with legal obligations; or</li>
                <li>Protect legitimate interests.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                When information is no longer reasonably necessary, we may delete, anonymize, or otherwise dispose of it in accordance with applicable law and our operational practices. Certain technical, security, transaction, or legal records may be retained for longer periods where reasonably necessary. We do not promise that every piece of information will be immediately and permanently deleted from all backup systems when an account is deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">11. ACCOUNT DELETION</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You may request deletion of your CollabFlow account through available account-management functionality or by contacting us. Upon account deletion, we may:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Disable the account;</li>
                <li>Delete or anonymize personal information;</li>
                <li>Delete associated content where appropriate;</li>
                <li>Retain certain information where required by law or reasonably necessary for security, fraud prevention, dispute resolution, or other lawful purposes.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                Content belonging to a workspace or project may also be subject to the permissions and actions of other workspace or project members.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">12. DATA SECURITY</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We implement reasonable technical and organizational measures intended to protect information against unauthorized access, alteration, disclosure, misuse, or destruction. These measures may include:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Authentication controls;</li>
                <li>Access controls;</li>
                <li>Password hashing;</li>
                <li>Secure authentication cookies;</li>
                <li>HTTPS/TLS communications;</li>
                <li>Server-side authorization;</li>
                <li>Security monitoring;</li>
                <li>Rate limiting;</li>
                <li>Validation of user input;</li>
                <li>Infrastructure security controls; and</li>
                <li>Other measures appropriate to the Service.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                However, no internet-connected system can guarantee absolute security. You are responsible for maintaining the security of your account credentials and devices. If you become aware of suspected unauthorized access or a security issue involving your account, you should notify us promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">13. USER CONTENT AND ORGANIZATION DATA</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may be used by individuals, teams, and organizations. When you upload or create content within a workspace or project, that content may be accessible to other members according to the permissions and functionality of that workspace or project. For example, project members may be able to access:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2 grid grid-cols-2 gap-x-4">
                <li>Tasks;</li>
                <li>Comments;</li>
                <li>Project information;</li>
                <li>Files;</li>
                <li>Activity information; and</li>
                <li>Other information shared within the project.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                You should therefore consider carefully what information you choose to upload or share.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">14. CHILDREN'S PRIVACY</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow is not intended for children who are below the minimum age permitted to use the Service under applicable law. We do not knowingly collect personal data from children where such collection is prohibited by applicable law. If we become aware that personal data has been collected from a child in circumstances where such processing is not permitted, we may take reasonable steps to delete the information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">15. YOUR RIGHTS</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Subject to applicable law, you may have rights concerning your personal data, including rights to:
              </p>
              <ul className="list-disc pl-5 mt-4 text-sm text-slate-600 space-y-2">
                <li>Request information about processing;</li>
                <li>Request access to relevant personal data;</li>
                <li>Request correction of inaccurate or incomplete information;</li>
                <li>Request deletion or erasure where legally applicable;</li>
                <li>Withdraw consent where processing is based on consent;</li>
                <li>Raise a grievance; and</li>
                <li>Exercise other rights provided by applicable data-protection law.</li>
              </ul>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We may need to verify your identity before processing certain requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">16. EXERCISING YOUR RIGHTS</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For privacy-related requests, contact:<br /><br />
                <strong>Email:</strong> collabflow.web@gmail.com
                <br /><br />
                Please include enough information for us to understand your request. We will handle requests in accordance with applicable law. If a request cannot be fulfilled, we may explain the applicable reason where legally permitted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">17. DATA PROTECTION AND GRIEVANCES</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow aims to provide a reasonable mechanism for users to raise privacy and data-protection concerns. You may contact us at:<br /><br />
                <strong>Email:</strong> collabflow.web@gmail.com
                <br /><br />
                Where applicable law requires a specific grievance mechanism, response period, designated contact, or other procedure, CollabFlow will follow the requirements applicable to the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">18. THIRD-PARTY LINKS AND SERVICES</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CollabFlow may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices, security, content, or policies of third-party services. You should review the privacy policies of third-party services before providing information to them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">19. CHANGES TO THIS PRIVACY POLICY</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. If we make material changes, we may provide reasonable notice through the Service, email, or another appropriate method.
                <br /><br />
                The updated Privacy Policy will become effective on the date stated at the beginning of the updated policy. Your continued use of CollabFlow after the updated policy becomes effective will be subject to the updated Privacy Policy to the extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-[#063325] mb-4">20. CONTACT</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For privacy, data-protection, or security questions:<br /><br />
                <strong>Email:</strong> collabflow.web@gmail.com
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
