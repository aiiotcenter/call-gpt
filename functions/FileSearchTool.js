const OpenAI = require("openai");
const client = new OpenAI();

module.exports = async function FileSearchTool(args) {
  try {
    const query = args.query || "";

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // or 'gpt-4-1106-preview'
      messages: [
        { role: "system", content: "You are a document search assistant." },
        { role: "user", content: query },
      ],
      // ✅ Correct Node.js way
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: ["vs_6835ae8f736c8191b7ebcb0b273161c9"], // your vector store
        },
      },
    });

    return {
      answer: response.choices[0].message?.content || "No results found.",
    };
  } catch (err) {
    console.error("FileSearchTool error:", err);
    return { error: "file-search-failure" };
  }
};
