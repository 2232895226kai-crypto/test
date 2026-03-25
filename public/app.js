const chatArea  = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-btn");

// 对话历史（不含开场白，那是 UI 展示用的）
const history = [];

/* ── 自动撑高 textarea ── */
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

/* ── Enter 发送，Shift+Enter 换行 ── */
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener("click", sendMessage);

/* ── 渲染一条消息 ── */
function appendMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message-row ${role === "user" ? "user-row" : "bot-row"}`;

  if (role === "assistant") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "四";
    row.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = `bubble ${role === "user" ? "user-bubble" : "bot-bubble"}`;
  bubble.textContent = text;
  row.appendChild(bubble);

  chatArea.appendChild(row);
  scrollToBottom();
  return bubble;
}

/* ── 打字动画占位 ── */
function appendTyping() {
  const row = document.createElement("div");
  row.className = "message-row bot-row";
  row.id = "typing-row";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "四";
  row.appendChild(avatar);

  const bubble = document.createElement("div");
  bubble.className = "bubble bot-bubble";
  bubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  row.appendChild(bubble);

  chatArea.appendChild(row);
  scrollToBottom();
  return row;
}

function removeTyping() {
  document.getElementById("typing-row")?.remove();
}

function scrollToBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

/* ── 主发送逻辑 ── */
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || sendBtn.disabled) return;

  // 渲染用户消息
  appendMessage("user", text);
  history.push({ role: "user", content: text });

  // 重置输入框
  userInput.value = "";
  userInput.style.height = "auto";
  sendBtn.disabled = true;

  // 显示打字动画
  const typingRow = appendTyping();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    removeTyping();

    // 创建流式气泡
    const bubble = appendMessage("assistant", "");
    let fullText = "";

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // 保留不完整行

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") break;

        try {
          const data = JSON.parse(payload);
          if (data.error) {
            bubble.textContent = data.error;
            bubble.style.color = "#c0392b";
          } else if (data.text) {
            fullText += data.text;
            bubble.textContent = fullText;
            scrollToBottom();
          }
        } catch { /* 忽略解析错误 */ }
      }
    }

    if (fullText) {
      history.push({ role: "assistant", content: fullText });
    }

  } catch (err) {
    removeTyping();
    appendMessage("assistant", "茶肆暂时出了点岔子，等一会儿再来？");
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}
