import { useEffect, useMemo, useState } from 'react'
import CartDrawer from './components/CartDrawer'
import FilterBar from './components/FilterBar'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import { CartProvider, useCart } from './context/CartContext'
import { PRODUCTS } from './data/products'
import type { CategoryFilter, SortKey } from './types'

/** 单条 Toast 自动消失的时长（毫秒） */
const TOAST_DURATION = 2000

/** Toast 轻提示：加购 / 下单成功后的反馈 */
function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      {message}
    </div>
  )
}

/** 页面主体：需要读取购物车状态的页面结构放在 CartProvider 内部 */
function Storefront() {
  const { clear } = useCart()

  // —— 页面级 UI 状态 ——
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [sortBy, setSortBy] = useState<SortKey>('featured')
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)

  // Toast 出现后定时自动消失
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toast])

  /** 弹出一条 Toast（id 用于触发 key 重渲染，让连续提示也能重新计时） */
  const showToast = (message: string) => setToast({ id: Date.now(), message })

  /**
   * 可见商品列表 = 目录 × 搜索词 × 分类 × 排序。
   * 用 useMemo 缓存，只在筛选条件变化时重新计算。
   */
  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    let list = PRODUCTS.filter((p) => {
      const matchCategory = category === 'All' || p.category === category
      const matchKeyword =
        keyword === '' ||
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword)
      return matchCategory && matchKeyword
    })

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    return list
  }, [query, category, sortBy])

  /** 清空搜索与分类（空状态页的引导按钮） */
  const resetFilters = () => {
    setQuery('')
    setCategory('All')
  }

  /** 模拟下单：清空购物车并给出成功提示（演示项目不接入真实支付） */
  const handleCheckout = () => {
    clear()
    setCartOpen(false)
    showToast('Order placed — thank you!')
  }

  return (
    <div className="app">
      <Header query={query} onQueryChange={setQuery} onOpenCart={() => setCartOpen(true)} />

      <main className="main">
        <section className="hero">
          <h1>Everyday essentials, delivered.</h1>
          <p>Curated gear for work, travel and everything in between.</p>
        </section>

        <FilterBar
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={visibleProducts.length}
        />

        <ProductGrid
          products={visibleProducts}
          onAdded={(p) => showToast(`${p.name} added to cart`)}
          onReset={resetFilters}
        />
      </main>

      <footer className="footer">
        VerveCart — demo storefront built with React + Vite + TypeScript.
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      {toast && <Toast key={toast.id} message={toast.message} />}
    </div>
  )
}

/** 应用根组件：CartProvider 提供全局购物车状态 */
export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  )
}
