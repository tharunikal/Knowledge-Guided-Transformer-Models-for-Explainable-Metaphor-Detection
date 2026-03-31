export default function SentenceHistory({ data }: { data: any[] }) {
  if (!data.length)
    return <p className="text-gray-500">No sentences found in database yet.</p>;

  return (
    <div className="overflow-x-auto bg-white/70 rounded-2xl shadow-lg backdrop-blur-md p-6">
      <table className="w-full border-collapse text-gray-800">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Sentence</th>
            <th className="p-3 text-left">Metaphor</th>
            <th className="p-3 text-left">Source Domain</th>
            <th className="p-3 text-left">Target Domain</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.sentence}</td>
              <td className="p-3">{item.analysis?.is_metaphor ? "✅ Yes" : "❌ No"}</td>
              <td className="p-3">{item.analysis?.source_domain}</td>
              <td className="p-3">{item.analysis?.target_domain}</td>
              <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
