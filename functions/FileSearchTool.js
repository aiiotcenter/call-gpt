const OpenAI = require("openai");

// ✅ create client with API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function FileSearchTool(args) {
  try {
    const query = args.query || "";

    const response = await client.responses.create({
      model: "gpt-4o",   // responses endpoint requires newer models
      input: [
        { role: "user", content: query }
      ],
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: ["vs_6835ae8f736c8191b7ebcb0b273161c9"],
        },
      },
    });

    const outputText =
      response.output?.[0]?.content?.[0]?.text || "No results found.";

    return { answer: outputText };
  } catch (err) {
    console.error("FileSearchTool error:", err);
    return { error: "file-search-failure" };
  }
};
