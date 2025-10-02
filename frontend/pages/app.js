import { useState } from 'react';
import useSWR from 'swr';
import IdeaCard from '../components/IdeaCard';

const API = process.env.NEXT_PUBLIC_API_URL || '';
const fetcher = url => fetch(url).then(r => r.json());

export default function AppPage() {
  const { data: ideas, mutate } = useSWR(`${API}/api/ideas`, fetcher, { refreshInterval: 5000 });
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    await fetch(`${API}/api/ideas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    mutate();
  }

  async function handleUpvote(id) {
    await fetch(`${API}/api/ideas/${id}/upvote`, { method: 'POST' });
    mutate();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea value={text} onChange={e => setText(e.target.value)} className="w-full border p-2" maxLength={280} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-2">Post</button>
      </form>
      {ideas?.map(idea => (
        <IdeaCard key={idea.id} idea={idea} onUpvote={() => handleUpvote(idea.id)} />
      ))}
    </div>
  );
}
