import type { Product } from '../types'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  onAdded: (product: Product) => void
  /** 空结果时由父组件清空搜索词与分类筛选 */
  onReset: () => void
}

/**
 * 商品网格：响应式栅格布局；无结果时显示空状态引导用户清空筛选。
 */
export default function ProductGrid({ products, onAdded, onReset }: Props) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No products found</p>
        <p className="empty-hint">Try a different keyword or category.</p>
        <button className="primary-button" onClick={onReset}>
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <section className="product-grid" aria-label="Product list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdded={onAdded} />
      ))}
    </section>
  )
}
