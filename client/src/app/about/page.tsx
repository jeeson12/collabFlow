import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#063325] flex flex-col">
      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-[#CBCBCB] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.035em] text-[#063325]"
          >
            CollabFlow
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

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <section className="flex-1 py-20 lg:py-15">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl mb-6">
            About CollabFlow
          </h1>

          <div className="prose prose-slate max-w-none text-[#063325]/80 space-y-8">
            <p className="text-lg leading-relaxed text-[#063325]">
              At CollabFlow, our mission is to simplify the way teams work
              together. We believe that great software shouldn't be complicated.
              By providing a clean, focused, and intuitive workspace, we help
              teams organize their projects, manage their tasks, and achieve
              their goals without the unnecessary friction of bloated tools.
            </p>

            <div>
              <h2 className="text-2xl font-serif font-bold text-[#063325] mb-4">
                What We Do
              </h2>
              <p className="leading-relaxed">
                CollabFlow provides a comprehensive suite of collaboration tools
                designed for modern teams. From Kanban boards and task
                assignments to real-time activity tracking and seamless file
                sharing, we bring everything your team needs into one unified
                platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-[#063325] mb-4">
                Our Core Values
              </h2>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>
                  <strong>Simplicity:</strong> We believe in intuitive design
                  that gets out of your way.
                </li>
                <li>
                  <strong>Reliability:</strong> Your data is secure, and our
                  platform is built to scale with your team.
                </li>
                <li>
                  <strong>Collaboration:</strong> We are dedicated to fostering
                  transparent and effective communication.
                </li>
                <li>
                  <strong>Privacy:</strong> We respect your data and adhere to
                  the highest standards of privacy protection.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-[#063325] mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed">
                Have questions or want to learn more? We'd love to hear from
                you. Reach out to our team at{" "}
                <a
                  href="mailto:collabflow.web@gmail.com"
                  className="font-semibold underline hover:text-[#063325]"
                >
                  collabflow.web@gmail.com
                </a>
                , and we'll be happy to help you get the most out of CollabFlow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#CBCBCB] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <Link
                href="/"
                className="text-lg font-semibold tracking-[-0.035em]"
              >
                CollabFlow
              </Link>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#063325]/60">
                Project collaboration, task management, and team activity in one
                focused workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#063325]">
              <Link href="/about" className="hover:opacity-60">
                About
              </Link>

              <Link href="/terms" className="hover:opacity-60">
                Terms of Service
              </Link>

              <Link href="/privacy" className="hover:opacity-60">
                Privacy Policy
              </Link>

              <a href="#" className="hover:opacity-60">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-[#CBCBCB] pt-6 text-xs text-[#063325]/50">
            © {new Date().getFullYear()} CollabFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
