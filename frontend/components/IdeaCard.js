export default function IdeaCard({ idea, onUpvote }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>{idea.text}</div>
      <div className="flex items-center space-x-2">
        <button onClick={onUpvote} className="px-2 py-1 border rounded">▲</button>
        <span>{idea.upvotes}</span>
      </div>
    </div>
  );
}
