import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
      <div className="mb-8">
        <Image
          src="/logo-omnes.svg"
          alt="Omnes Logo"
          width={180}
          height={180}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MSA API Documentation
        </h1>
        <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto mb-8">
          Create and manage Account Abstraction wallets with multi-signature validation, 
          passkey authentication, and HSM/MPC signing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        <Link
          href="/docs/getting-started/quick-start"
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold mb-2">Quick Start</h3>
          <p className="text-sm text-fd-muted-foreground">
            Create your first wallet in 5 minutes
          </p>
        </Link>

        <Link
          href="/docs/api-reference/interactive-docs"
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">🔧</div>
          <h3 className="font-semibold mb-2">Interactive API</h3>
          <p className="text-sm text-fd-muted-foreground">
            Try the API directly in your browser
          </p>
        </Link>

        <Link
          href="/docs/sdk/typescript-sdk"
          className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-semibold mb-2">TypeScript SDK</h3>
          <p className="text-sm text-fd-muted-foreground">
            Integrate with type-safe code
          </p>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
        <Link
          href="/docs"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Explore Documentation
        </Link>
        <Link
          href="/docs/getting-started/quick-start"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Quick Start Guide
        </Link>
        <a
          href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Contact Us
        </a>
      </div>

      <footer className="mt-12 w-full border-t pt-8 pb-6">
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-fd-muted-foreground">
            <a
              href="https://omnes.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Visit omnes.dev
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="mailto:gus@omnes.dev"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Send Email
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://calendly.com/omnes-blockchain/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Schedule a Meeting
            </a>
          </div>
          <p className="text-sm text-fd-muted-foreground">
            Built with ❤️ by the Omnes Team
          </p>
          <p className="text-sm text-fd-muted-foreground">
            Making Account Abstraction accessible to developers worldwide
          </p>
        </div>
      </footer>
    </main>
  );
}
