const features = [
  ["[TGT] markers", "+2%"],
  ["Knowledge-Guided Attention", "+3%"],
  ["Discourse Fusion", "+1.5%"],
  ["Dual-Head Output", "+1%"],
  ["Quantization + BERT Modifications", "+3%"],
];

export default function AblationTable() {
  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">🔬 Ablation & Generalization</h2>

      <table className="w-full border-collapse text-gray-800 mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Feature</th>
            <th className="p-3 text-left">F1-score Improvement</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-3">{row[0]}</td>
              <td className="p-3">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-gray-700 leading-relaxed">
        <p><b>Quantization</b> not only maintains high performance but also reduces model size by <b>3×</b> and speeds up inference by <b>40%</b>.</p>
        <p className="mt-2"><b>Generalization:</b> VUA → MOH-X transfer shows +5% improvement over vanilla BERT.</p>
        <p className="mt-2">Robust across genres (literary, conversational, news) and achieves <b>40% faster inference</b> with minimal accuracy loss.</p>
      </div>
    </div>
  );
}
