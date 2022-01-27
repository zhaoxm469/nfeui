import{_ as n,c as s,o as a,a as t}from"./app.d0c06810.js";const p={components:{}},m='{"title":"\u5FEB\u901F\u5F00\u59CB","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5","slug":"\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5"},{"level":2,"title":"\u5728\u9879\u76EE\u4E2D\u4F7F\u7528","slug":"\u5728\u9879\u76EE\u4E2D\u4F7F\u7528"},{"level":3,"title":"\u5B8C\u6574\u5F15\u5165","slug":"\u5B8C\u6574\u5F15\u5165"},{"level":3,"title":"\u6309\u9700\u5F15\u5165","slug":"\u6309\u9700\u5F15\u5165"},{"level":2,"title":"\u6D4F\u89C8\u5668CDN\u76F4\u63A5\u5F15\u5165","slug":"\u6D4F\u89C8\u5668cdn\u76F4\u63A5\u5F15\u5165"}],"relativePath":"quickstart.md","lastUpdated":1643189492316}',e=t(`<h1 id="\u5FEB\u901F\u5F00\u59CB"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB" aria-hidden="true">#</a> \u5FEB\u901F\u5F00\u59CB</h1><p>\u672C\u8282\u5C06\u4ECB\u7ECD\u5982\u4F55\u5728\u9879\u76EE\u4E2D\u4F7F\u7528 NfeUI</p><h2 id="\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5"><a class="header-anchor" href="#\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5" aria-hidden="true">#</a> \u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5</h2><p>\u6211\u4EEC\u5EFA\u8BAE\u60A8\u4F7F\u7528\u5305\u7BA1\u7406\u5668 (NPM, Yarn, pnpm) \u5B89\u88C5 NfeUI, \u7136\u540E\u60A8\u5C31\u53EF\u4EE5\u4F7F\u7528\u6253\u5305\u5DE5\u5177\uFF0C\u4F8B\u5982 Vite \u548C webpack</p><div class="language-bash"><pre><code><span class="token comment"># \u9009\u62E9\u4E00\u4E2A\u4F60\u559C\u6B22\u7684\u5305\u7BA1\u7406\u5668</span>

<span class="token comment"># NPM</span>
$ <span class="token function">npm</span> <span class="token function">install</span> nfeui --save

<span class="token comment"># Yarn</span>
$ <span class="token function">yarn</span> <span class="token function">add</span> nfeui

<span class="token comment"># pnpm</span>
$ <span class="token function">pnpm</span> <span class="token function">install</span> nfeui
</code></pre></div><h2 id="\u5728\u9879\u76EE\u4E2D\u4F7F\u7528"><a class="header-anchor" href="#\u5728\u9879\u76EE\u4E2D\u4F7F\u7528" aria-hidden="true">#</a> \u5728\u9879\u76EE\u4E2D\u4F7F\u7528</h2><h3 id="\u5B8C\u6574\u5F15\u5165"><a class="header-anchor" href="#\u5B8C\u6574\u5F15\u5165" aria-hidden="true">#</a> \u5B8C\u6574\u5F15\u5165</h3><p>\u5982\u679C\u4F60\u5BF9\u6253\u5305\u540E\u7684\u6587\u4EF6\u5927\u5C0F\u4E0D\u662F\u5F88\u5728\u4E4E\uFF0C\u90A3\u4E48\u4F7F\u7528\u5B8C\u6574\u5BFC\u5165\u4F1A\u66F4\u65B9\u4FBF\u3002</p><div class="language-TypeScript"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> NfeUI <span class="token keyword">from</span> <span class="token string">&#39;nfeui&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;nfeui/dist/style.css&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>NfeUI<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="\u6309\u9700\u5F15\u5165"><a class="header-anchor" href="#\u6309\u9700\u5F15\u5165" aria-hidden="true">#</a> \u6309\u9700\u5F15\u5165</h3><div class="language-TypeScript"><pre><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>nfeButton type<span class="token operator">=</span><span class="token string">&quot;primary&quot;</span><span class="token operator">&gt;</span>\u6309\u94AE<span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>nfeButton<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">&quot;ts&quot;</span> setup <span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nfeButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nfeui&#39;</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h2 id="\u6D4F\u89C8\u5668cdn\u76F4\u63A5\u5F15\u5165"><a class="header-anchor" href="#\u6D4F\u89C8\u5668cdn\u76F4\u63A5\u5F15\u5165" aria-hidden="true">#</a> \u6D4F\u89C8\u5668CDN\u76F4\u63A5\u5F15\u5165</h2><p>\u76F4\u63A5\u901A\u8FC7\u6D4F\u89C8\u5668\u7684 HTML \u6807\u7B7E\u5BFC\u5165 NfeUI\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u4F7F\u7528\u5168\u5C40\u53D8\u91CF nfeui \u4E86 \u3002</p><div class="language-html"><pre><code><span class="token comment">&lt;!-- \u5BFC\u5165 nfeui \u6837\u5F0F --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.nucarf.cn/common/v1.0/nfeui/next.css<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- \u5BFC\u5165 Vue 3 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>//cdn.jsdelivr.net/npm/vue@next<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- \u5BFC\u5165 nfeui \u7EC4\u4EF6\u5E93 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.nucarf.cn/common/v1.0/nfeui/next.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token operator">=</span> Vue<span class="token punctuation">;</span>

    <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
         &lt;nfeButton&gt;\u6309\u94AE&lt;/nfeButton&gt;&lt;br&gt;
         &lt;nfeButton type=&quot;primary&quot;&gt;\u786E\u5B9A&lt;/nfeButton&gt;&lt;br&gt;
         &lt;nfeButton type=&quot;success&quot; loading&gt;\u63D0\u4EA4&lt;/nfeButton&gt;&lt;br&gt;
       </span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>nfeui<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,14),o=[e];function c(l,u,r,i,k,d){return a(),s("div",null,o)}var f=n(p,[["render",c]]);export{m as __pageData,f as default};