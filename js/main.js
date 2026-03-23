function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function renderPosts() {
  const list = document.getElementById('posts-list');
  if (!list) return;

  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  list.innerHTML = sorted.map(post => `
    <a class="post-card" href="post.html?id=${post.id}">
      <span class="post-date">${formatDate(post.date)}</span>
      <div class="post-info">
        <div class="post-title">${post.title}</div>
        <div class="post-excerpt">${post.excerpt}</div>
        <div class="post-tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

renderPosts();
