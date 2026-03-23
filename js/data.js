const POSTS = [
  {
    id: 1,
    title: "Hello World — 博客开张了",
    date: "2026-03-20",
    tags: ["随笔"],
    excerpt: "终于把这个博客搭起来了。用最简单的 HTML + CSS + JS，没有任何框架，反而觉得挺舒服的。",
    content: `
<p>终于把这个博客搭起来了。</p>
<p>折腾了好几次，用过 Hexo、Hugo，也试过各种托管平台。最后发现，对我来说最顺手的还是从头写一个纯静态页面——没有依赖，没有构建步骤，打开浏览器就能用。</p>
<h2>为什么写博客</h2>
<p>费曼曾说，如果你不能向别人解释清楚一件事，说明你自己还没真正理解它。写博客对我来说就是这个作用：把脑子里模糊的想法逼成清晰的文字。</p>
<p>另一个原因是记忆。我经常遇到一个问题，想起来之前解决过，但就是想不起细节。如果当时写下来了，现在直接搜一下就好了。</p>
<h2>会写什么</h2>
<ul>
  <li>技术笔记 — 遇到的坑、有趣的工具、读代码的心得</li>
  <li>读书随想 — 不是书评，只是读到某句话有感而发</li>
  <li>日常碎片 — 不知道怎么分类的东西</li>
</ul>
<p>没有固定更新频率，想到了就写。</p>
<blockquote>写作是思考的方式，不是思考结束后的产物。</blockquote>
<p>就先这样，开始吧。</p>
    `
  },
  {
    id: 2,
    title: "用纯 CSS 实现暗色模式切换",
    date: "2026-03-18",
    tags: ["CSS", "前端"],
    excerpt: "prefers-color-scheme 加上 CSS 变量，几十行代码实现系统级暗色模式适配，不需要一行 JavaScript。",
    content: `
<p>暗色模式现在几乎是必备功能了。实现方式有很多，但最轻量的是直接用 CSS 媒体查询 + CSS 变量，连 JavaScript 都不需要。</p>
<h2>核心原理</h2>
<p>浏览器暴露了一个媒体查询 <code>prefers-color-scheme</code>，可以检测用户系统的颜色偏好。</p>
<pre><code>@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f1f5f9;
    --color-surface: #1e293b;
    --color-border: #334155;
  }
}</code></pre>
<p>配合 CSS 变量，就能让整个页面跟随系统主题自动切换，完全无感知。</p>
<h2>完整示例</h2>
<p>先定义亮色模式的变量（作为默认值）：</p>
<pre><code>:root {
  --color-bg: #ffffff;
  --color-text: #1c1917;
  --color-surface: #f5f5f4;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}</code></pre>
<p>然后覆盖暗色模式：</p>
<pre><code>@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #e2e8f0;
    --color-surface: #1e293b;
  }
}</code></pre>
<h2>如果还需要手动切换</h2>
<p>如果用户想手动切换（不跟随系统），可以给 <code>html</code> 元素加一个 <code>data-theme</code> 属性，然后用 JS 切换它：</p>
<pre><code>document.documentElement.dataset.theme = 'dark';
</code></pre>
<p>CSS 里：</p>
<pre><code>[data-theme="dark"] {
  --color-bg: #0f172a;
  /* ... */
}</code></pre>
<p>这样就同时支持自动和手动两种模式了。</p>
    `
  },
  {
    id: 3,
    title: "重读《黑客与画家》",
    date: "2026-03-10",
    tags: ["读书", "随笔"],
    excerpt: "十几年前第一次读这本书，当时觉得 Paul Graham 说的都对。现在重读，有些地方开始有不同的看法了。",
    content: `
<p>这本书我大概每两三年会重读一次。第一次读是大学时，觉得每一篇都在说我心里说不出来的话。</p>
<p>这次重读，感受复杂了一些。</p>
<h2>仍然喜欢的部分</h2>
<p>关于编程作为一种创作活动的观点，我越来越认同。写好的代码和写好的文章在某种意义上是一样的——都需要反复修改，都需要站在读者（或维护者）的角度想问题。</p>
<blockquote>好的代码就像好的散文：清晰、简洁、表达准确。</blockquote>
<p>他关于"保持贫穷"的观点也有道理——不是说要真的穷，而是说不要被生活方式的惯性绑架，要保持做决定的自由。</p>
<h2>开始有异议的部分</h2>
<p>他对"平庸"的厌恶有时候显得过于精英化。不是每个人都想成为出类拔萃的那种人，"普通地生活"本身也可以是一种有价值的选择。</p>
<p>另外，书里对大公司的描述有些过时了。现在的科技公司（包括他投资的那些）在某种程度上已经成了他当年批评的那种东西。</p>
<h2>总的来说</h2>
<p>仍然值得读。它最大的价值不是那些具体的观点，而是一种思考方式：对事物刨根问底，不接受"大家都这么做"作为理由。</p>
<p>这种习惯，比任何具体的结论都有用。</p>
    `
  },
  {
    id: 4,
    title: "Git 工作流：我的日常使用习惯",
    date: "2026-03-01",
    tags: ["Git", "工具"],
    excerpt: "不是教程，只是记录我自己用 Git 的一些习惯和小技巧，供参考。",
    content: `
<p>用了 Git 这么多年，积累了一些小习惯。不一定是最佳实践，但对我来说顺手。</p>
<h2>提交信息</h2>
<p>我用的格式很简单：<code>动词 + 做了什么</code>。英文用命令式，中文用陈述式。</p>
<pre><code>fix: 修复用户登录时的空指针异常
feat: 添加文章标签过滤功能
refactor: 提取重复的数据处理逻辑</code></pre>
<p>核心原则：提交信息要说明"做了什么"，最好还能说明"为什么"。"fix bug"这种信息毫无用处。</p>
<h2>分支策略</h2>
<p>个人项目我通常就在 main 上开发，有实验性改动才开分支。团队项目按功能或 issue 开分支，合并前 rebase 到最新的 main。</p>
<h2>几个常用的命令</h2>
<pre><code># 修改最近一次提交（未推送时）
git commit --amend --no-edit

# 撤销工作区改动
git restore .

# 临时保存改动
git stash push -m "描述一下这是什么"

# 查看某个文件的改动历史
git log -p -- path/to/file

# 找出是哪次提交引入了某个 bug
git bisect start
git bisect bad          # 当前有问题
git bisect good v1.0    # 这个版本没问题</code></pre>
<h2>我避免做的事</h2>
<ul>
  <li>不用 <code>git push --force</code>，除非在自己的分支上且确定没人依赖它</li>
  <li>不提交密码、密钥等敏感信息（用 .gitignore 和环境变量）</li>
  <li>不写没有意义的提交信息</li>
</ul>
<p>Git 是工具，关键是养成让未来的自己（和同事）不痛苦的习惯。</p>
    `
  }
];
