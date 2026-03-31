const models = [
  ["SVM (Feature-based)", "68%", "64%", "66%", "65%"],
  ["BiLSTM + GloVe", "73%", "72%", "70%", "71%"],
  ["BERT-base (vanilla)", "82%", "81%", "83%", "82%"],
  ["MelBERT (2021)", "85%", "84%", "85%", "85%"],
  ["Our Model (BERT + TGT + Triple-Stage + Knowledge Infusion + Quantization)", "94%", "92%", "93%", "93%"],
];

export default function ResultsTable() {
  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">🏁 Model Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Accuracy</th>
              <th className="p-3 text-left">Precision</th>
              <th className="p-3 text-left">Recall</th>
              <th className="p-3 text-left">F1-score</th>
            </tr>
          </thead>
          <tbody>
            {models.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {row.map((cell, i) => (
                  <td key={i} className="p-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
