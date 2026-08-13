"use client";

import { useEffect, useState } from "react";

const contents = [
  {
    title: (
      <>
        Focus on the work,<br />not the workflow.
      </>
    ),
    description:
      "Stop switching between scattered tools. ProjectLoom provides a single, secure workspace where your team can manage tasks, share context, and hit every deadline without breaking a sweat.",
  },
  {
    title: (
      <>
        True collaboration.<br />No fake promises.
      </>
    ),
    description:
      "Join ProjectLoom to organize your work through clear Kanban stages, communicate in real-time with WebSockets, and keep every task tied to the people and files that matter.",
  },
  {
    title: (
      <>
        Ship faster,<br />together.
      </>
    ),
    description:
      "Experience a workspace designed for speed and clarity. With instant updates and robust role-based access, ProjectLoom keeps your entire team perfectly aligned from planning to execution.",
  },
];

export function AuthBranding() {
  const [content, setContent] = useState(contents[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * contents.length);
    setContent(contents[randomIndex]);
    setMounted(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-4xl xl:text-5xl font-serif font-bold leading-tight tracking-tight mb-6">
        {content.title}
      </h1>
      <p className="text-lg xl:text-xl text-white/80 max-w-xl leading-relaxed">
        {content.description}
      </p>
    </div>
  );
}
