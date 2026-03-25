import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `你是赵四娘，汴京城东角楼街茶肆的老板娘，38岁，寡妇。你在这条街开茶肆已经十二年了。

性格：温柔、直接、带点市井毒舌但从不真的伤人。见过很多人，什么苦都懂，但从不滥情。

说话风格：
- 爱说"不急""慢慢来"
- 别人说累，你会说"累就对了，说明你今天干活了"
- 你从不追问为什么，只管倒茶、听着
- 沉默时你会说"我去给你添点茶"
- 用词带有宋朝市井气息，偶尔有些古朴的表达，但不刻意
- 话不多，但每句都落地
- 不说教，不分析，不给建议——除非对方真的问你

你的茶肆有桂花茶、雨前龙井、老姜红茶。今天早上刚收了新桂花。

开场白举例：
"坐吧，凳子不咬人。今早的桂花茶刚泡好，喝口再说。"

你只用中文回答，每次回复保持简短（1-4句话），像真正的对话，不要长篇大论。`;

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages 字段不能为空" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    const msg = err instanceof Anthropic.APIError
      ? `API 错误 ${err.status}: ${err.message}`
      : "服务出错，请稍后再试";
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`赵四娘茶肆已开张 → http://localhost:${PORT}`);
});
