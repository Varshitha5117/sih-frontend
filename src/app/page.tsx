'use client';

import Image from "next/image";
import { setAuthToken } from "../utils/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleDevLogin = () => {
    // Set a mock authentication token
    setAuthToken('mock-jwt-token');
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="font-sans min-h-screen bg-[#182128] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Ocean Watch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            Discover and share amazing content with the Ocean Watch community.
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
            href="/signup"
          >
            Get Started
          </a>
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-base font-medium text-white bg-transparent border border-white hover:bg-white/10 transition duration-200"
            href="/login"
          >
            Log In
          </a>
          <button
            onClick={handleDevLogin}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition duration-200"
          >
            Dev Login (Access Dashboard & Profile)
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
