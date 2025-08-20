const OpenAI = require("openai");
const client = new OpenAI();

module.exports = async function FileSearchTool(args) {
  try {
    const query = args.query || "";

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or whichever you prefer
      messages: [
        { role: "system", content: "You are a document search assistant." },
        { role: "user", content: query },
      ],
      // 🔹 Vector store binding
      file_search: { vector_store_ids: ["vs_6835ae8f736c8191b7ebcb0b273161c9"] },
    });

    return {
      answer: response.choices[0].message?.content || "No results found.",
    };
  } catch (err) {
    console.error("FileSearchTool error:", err);
    return { error: "file-search-failure" };
  }
};
