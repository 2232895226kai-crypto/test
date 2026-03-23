function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderPost() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const container = document.getElementById('post-content');
  if (!container) return;

  const post = POSTS.find(p => p.id === id);

  if (!post) {
    container.innerHTML = `
      <div class="not-found">
        <h2>文章不存在</h2>
        <p>该文章可能已被删除或链接有误。</p>
      </div>
    `;
    return;
  }

  document.title = `${post.title} - 我的博客`;

  container.innerHTML = `
    <div class="post-full-header">
      <h1 class="post-full-title">${post.title}</h1>
      <div class="post-meta">
        <span>${formatDate(post.date)}</span>
        <div class="post-tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="post-body">${post.content}</div>
  `;
}

renderPost();
