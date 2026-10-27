import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import type { Product } from '../types'

interface Props {
  product: Product
  /** 加入购物车成功后回调（父组件用于弹出 Toast 提示） */
  onAdded: (product: Product) => void
}

/**
 * 商品卡片：图片 + 分类 + 名称 + 简介 + 价格 + 加购按钮。
 */
export default function ProductCard({ product, onAdded }: Props) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <div className="product-media">
        {/* loading="lazy" 让首屏以外的图片进入视口才加载 */}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            className="add-button"
            onClick={() => {
              addItem(product)
              onAdded(product)
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  )
}
