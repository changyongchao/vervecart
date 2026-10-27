# VerveCart 🛍️

[![Deploy to GitHub Pages](https://github.com/changyongchao/vervecart/actions/workflows/deploy.yml/badge.svg)](https://github.com/changyongchao/vervecart/actions/workflows/deploy.yml)

面向海外消费者的商品选购 Web 应用（演示项目）：浏览商品、搜索筛选、加入购物车，购物车数据本地持久化。基于 **React 18 + Vite 5 + TypeScript** 构建，使用 npm 作为包管理器。

## 功能清单

- ✅ **商品浏览**：12 件 mock 商品（Audio / Wearables / Home / Accessories 四大类），响应式栅格布局
- ✅ **搜索与筛选**：关键词实时搜索（匹配名称与简介）、分类筛选、4 种排序（Featured / 价格升降 / 名称）
- ✅ **购物车**：加购、数量增减（减到 0 自动移除）、单件移除、小计与总件数实时计算、模拟 Checkout
- ✅ **localStorage 持久化**：刷新 / 关闭页面后购物车不丢失
- ✅ **响应式设计**：桌面端与手机端均有良好体验（手机端两列商品、全宽抽屉、横向滑动分类栏、安全区适配）
- ✅ **交互细节**：加购 Toast 提示、购物车角标、空状态引导、键盘焦点样式（a11y）

## 快速启动

```bash
# 1. 安装依赖（npm）
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 生产构建 + 预览（可选）
npm run build
npm run preview
```

> 注意：若本机 5173 端口被占用，Vite 会自动换用 5174 等端口，以终端实际输出的地址为准。
> `vite.config.ts` 已开启 `host: true`，手机真机可通过局域网 IP 访问验证移动端体验。

## 目录结构

```
src/
├── main.tsx                  # 入口：挂载根组件
├── App.tsx                   # 页面组装：搜索/筛选/排序状态 + Toast + 布局
├── index.css                 # 全局样式（CSS 变量 + 移动优先媒体查询）
├── types.ts                  # Product / CartItem 等类型定义
├── lib/format.ts             # 价格格式化（Intl USD）
├── data/products.ts          # 商品目录 mock 数据
├── context/CartContext.tsx   # 购物车：Context + useReducer + localStorage 持久化
└── components/
    ├── Header.tsx            # 吸顶顶栏：品牌 / 搜索框 / 购物车入口
    ├── FilterBar.tsx         # 分类 chips + 排序下拉 + 结果数
    ├── ProductGrid.tsx       # 商品网格 + 空状态
    ├── ProductCard.tsx       # 商品卡片
    └── CartDrawer.tsx        # 购物车抽屉（遮罩 / 数量步进 / 结算区）
```

## 已完成的内容

- 完整购物链路：浏览 → 搜索/筛选/排序 → 加购 → 改数量 → 结算清空，全流程无刷新交互
- 购物车采用 `Context + useReducer` 集中管理，所有变更走纯函数 reducer，派生数据（总件数、小计）用 `useMemo` 缓存
- 持久化方案：localStorage 中只存 `{ id, quantity }[]`，恢复时以最新商品目录补全详情；目录中不存在的条目自动丢弃，损坏数据静默回退空购物车
- 全部代码带中文注释，类型严格（`strict` 模式下 `tsc --noEmit` 零错误）

## 实际验证过的场景（浏览器实测通过）

1. 页面加载：标题正确，12 件商品卡片（含图片、价格）完整渲染
2. 搜索 `watch`：列表过滤为 2 件，结果数同步为 "2 items"；清空后恢复 12 件
3. 分类筛选 `Audio`：只剩 3 件；切回 `All` 恢复
4. 加购 2 件：Toast 提示出现，Cart 角标显示 2
5. 抽屉结算区：小计 $248.00；点 "+" 后件数 3、小计实时更新为 $377.00
6. **刷新页面后购物车仍在**（Aurora ×2、Chrono ×1、小计 $377.00），持久化生效
7. 手机视口 390×844：媒体查询生效，抽屉全宽、搜索框独占一行
8. Checkout：购物车清空并显示 "Order placed — thank you!" 提示

## 已知问题

- **Checkout 为模拟行为**：仅清空购物车并提示成功，未接入真实支付/下单 API
- **多标签页不同步**：已写入 storage 事件但未监听，两个标签页的购物车可能互相覆盖（可用 `storage` 事件解决，演示未做）
- **图片为生成图**：首次加载 12 张图片可能有延迟（已用 `loading="lazy"` 缓解）；弱网下可观察到渐进加载
- **搜索为纯前端包含匹配**：无分词、无拼音/拼写容错，数据量增大需换服务端搜索
- **商品数量上限 99**：超过后角标显示 `99+`，未做库存校验

## 主要取舍

| 取舍 | 原因 |
| --- | --- |
| 不引入路由库（react-router） | 单页 + 抽屉已覆盖全部需求，少一层依赖更利于面试讲解；商品详情直接展示在卡片中 |
| 不引入状态库（Redux/Zustand） | 单一全局状态（购物车），Context + useReducer 足够，代码更少且语义清晰 |
| 不使用 UI 组件库 | 纯手写 CSS（CSS 变量 + 移动优先），完全掌控响应式细节，包体最小 |
| localStorage 只存 id + quantity | 商品详情以目录为准，避免价格/名称更新后展示旧数据，也防止脏数据导致崩溃 |
| UI 文案用英文 | 面向海外消费者的定位；代码注释用中文，方便面试沟通 |
| mock 数据静态内置 | 演示项目不依赖后端；数据层独立（`data/products.ts`），替换为 API 请求只需改一处 |

## 部署（GitHub Pages）

- **在线地址**：https://changyongchao.github.io/vervecart/
- **仓库**：https://github.com/changyongchao/vervecart

流水线见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)：推送到 `main` 分支（或在 Actions 页面手动触发）后，GitHub Actions 自动执行 `npm ci` → `npm run build`（注入 Pages 子路径 `BASE_PATH`）→ 部署到 GitHub Pages。`actions/configure-pages` 的 `enablement: true` 会在首次运行时自动启用 Pages，无需手动到仓库设置里开启。
