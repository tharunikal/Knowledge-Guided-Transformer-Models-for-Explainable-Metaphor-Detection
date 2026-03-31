import mongoose, { Schema, models, model } from "mongoose";

const AnalysisSchema = new Schema({
  sentence: { type: String, required: true },
  is_metaphor: { type: Boolean, required: true },
  metaphorical_expression: { type: String, required: true },
  target_word: { type: String },
  source_domain: { type: String },
  target_domain: { type: String },
  domain_mapping: { type: String },
  literal_meaning: { type: String },
  contextual_usage: { type: String },
  etymology: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Analysis = models.Analysis || model("Analysis", AnalysisSchema);
export default Analysis;
