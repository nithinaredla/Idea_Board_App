import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-extrabold">Idea Board</h1>
        <p className="mt-4 text-gray-600">Capture, share, and upvote ideas anonymously.</p>
        <div className="mt-8">
          <Link href="/app">
            <a className="bg-indigo-600 text-white px-6 py-3 rounded-lg">Open the Board</a>
          </Link>
        </div>
      </header>
    </div>
  );
}
