import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'

interface Props {
  open: boolean
  onClose: () => void
  /** 点击 Checkout 后回调（父组件用于清空购物车并弹出提示） */
  onCheckout: () => void
}

/**
 * 购物车抽屉：桌面端右侧滑出（420px），手机端占满全宽；点击遮罩关闭。
 * 关闭时组件仍保留在 DOM 中（仅加 class 隐藏），以保证滑出动画流畅。
 */
export default function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { items, totalCount, subtotal, setQuantity, removeItem } = useCart()

  return (
    // 关闭时通过 CSS pointer-events: none 屏蔽交互
    <div className={`drawer-root ${open ? 'open' : ''}`} aria-hidden={!open}>
      {/* 遮罩层：点击任意处关闭抽屉 */}
      <div className="drawer-overlay" onClick={onClose} />

      <aside className="drawer" role="dialog" aria-label="Shopping cart">
        <div className="drawer-header">
          <h2>
            Your cart
            {totalCount > 0 && <span className="drawer-count"> ({totalCount})</span>}
          </h2>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          // —— 空购物车状态 ——
          <div className="drawer-empty">
            <p className="empty-title">Your cart is empty</p>
            <p className="empty-hint">Add something you love from the catalog.</p>
            <button className="primary-button" onClick={onClose}>
              Browse products
            </button>
          </div>
        ) : (
          <>
            {/* —— 商品条目列表 —— */}
            <ul className="drawer-items">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <img className="cart-item-img" src={product.image} alt="" />

                  <div className="cart-item-info">
                    <span className="cart-item-name">{product.name}</span>
                    <span className="cart-item-price">{formatPrice(product.price)}</span>

                    {/* 数量步进器：− 到 0 会自动移除该商品 */}
                    <div className="qty-stepper" aria-label={`Quantity of ${product.name}`}>
                      <button
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="icon-button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            {/* —— 底部结算区 —— */}
            <div className="drawer-footer">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="shipping-note">Shipping &amp; taxes calculated at checkout.</p>
              <button className="primary-button checkout-button" onClick={onCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
