import { Configuration, OpenAIApi } from "openai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const embedText = async (text: string) => {
  const res = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  return res.data.data[0].embedding;
};

export const storeMessage = async (
  sessionId: string,
  role: string,
  content: string
) => {
  const embedding = await embedText(content);
  await supabase
    .from("memory")
    .insert({ session_id: sessionId, role, content, embedding });
};

export const fetchSimilarMessages = async (
  sessionId: string,
  userInput: string,
  limit = 5
) => {
  const queryEmbedding = await embedText(userInput);
  const { data, error } = await supabase.rpc("match_memory", {
    query_embedding: queryEmbedding,
    match_threshold: 0.78,
    match_count: limit,
  });
  return data || [];
};
