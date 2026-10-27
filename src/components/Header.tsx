import { useCart } from '../context/CartContext'

interface Props {
  query: string
  onQueryChange: (value: string) => void
  onOpenCart: () => void
}

/** 购物车图标（描边风格 SVG，随文字颜色变化） */
function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

/**
 * 顶部栏：品牌 + 搜索框 + 购物车入口（吸顶显示）。
 * 布局说明：手机端为「品牌/购物车一行 + 搜索框一行」，桌面端三列一行，由 CSS grid-template-areas 控制。
 */
export default function Header({ query, onQueryChange, onOpenCart }: Props) {
  const { totalCount } = useCart()

  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="/" onClick={(e) => e.preventDefault()}>
          Verve<span>Cart</span>
        </a>

        <input
          className="search-input"
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search products"
        />

        <button className="cart-button" onClick={onOpenCart} aria-label={`Open cart, ${totalCount} items`}>
          <CartIcon />
          <span className="cart-button-label">Cart</span>
          {totalCount > 0 && <span className="cart-badge">{totalCount > 99 ? '99+' : totalCount}</span>}
        </button>
      </div>
    </header>
  )
}
