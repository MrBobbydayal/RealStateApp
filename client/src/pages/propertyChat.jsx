import { useState } from 'react';

function AIChatModal({ property, onClose }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/v1/property/AIChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property, question })
    });

    const data = await res.json();
    setAnswer(data.answer || "Sorry, no reply.");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow-md relative">
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-500">✖</button>
        <h2 className="text-xl font-bold mb-2">Ask about this Property</h2>
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={3}
          placeholder="E.g., Is it furnished?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askAI} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        {answer && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            🤖 {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIChatModal;
