import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS } from '../data/products'
import type { CartItem, Product } from '../types'

/** localStorage 键名带版本号，未来结构变更时可平滑迁移 */
const STORAGE_KEY = 'vervecart.cart.v1'

/** 单件商品数量上限，防止误触或异常数据导致数量爆炸 */
const MAX_QUANTITY = 99

/** Context 暴露给组件的 API */
interface CartContextValue {
  items: CartItem[]
  /** 商品总件数（用于头部角标） */
  totalCount: number
  /** 小计金额（美元） */
  subtotal: number
  addItem: (product: Product) => void
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }

/** 购物车纯函数 reducer：所有状态变更都集中在这里，便于测试与排查 */
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.product.id === action.product.id)
      // 已在购物车则数量 +1，否则新增一条
      if (existing) {
        return state.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
            : i,
        )
      }
      return [...state, { product: action.product, quantity: 1 }]
    }
    case 'SET_QUANTITY': {
      // 数量减到 0 及以下等价于移除该商品
      if (action.quantity <= 0) {
        return state.filter((i) => i.product.id !== action.productId)
      }
      return state.map((i) =>
        i.product.id === action.productId
          ? { ...i, quantity: Math.min(action.quantity, MAX_QUANTITY) }
          : i,
      )
    }
    case 'REMOVE':
      return state.filter((i) => i.product.id !== action.productId)
    case 'CLEAR':
      return []
  }
}

/**
 * 从 localStorage 恢复购物车。
 * 持久化只保存 { id, quantity }，商品详情以当前目录数据为准——
 * 这样即使商品信息（价格/名称）更新，恢复后也是最新数据；目录中不存在的条目会被丢弃。
 */
function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const saved: unknown = JSON.parse(raw)
    if (!Array.isArray(saved)) return []
    return saved.flatMap((entry) => {
      const { id, quantity } = entry as { id?: string; quantity?: number }
      const product = PRODUCTS.find((p) => p.id === id)
      if (!product || typeof quantity !== 'number' || quantity < 1) return []
      return [{ product, quantity: Math.min(quantity, MAX_QUANTITY) }]
    })
  } catch {
    // JSON 损坏等情况：静默回退到空购物车，不让页面崩溃
    return []
  }
}

/** 购物车 Provider：包裹在应用最外层，任何组件都可通过 useCart() 读写购物车 */
export function CartProvider({ children }: { children: ReactNode }) {
  // 第三个参数（惰性初始化）保证读取 localStorage 只发生在首次挂载时
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)

  // 购物车变化时写回 localStorage，实现“刷新页面数据不丢失”
  useEffect(() => {
    const saved = items.map((i) => ({ id: i.product.id, quantity: i.quantity }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }, [items])

  // 派生数据（总件数/小计）与方法引用统一 memo，避免不必要的重渲染
  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
    return {
      items,
      totalCount,
      subtotal,
      addItem: (product) => dispatch({ type: 'ADD', product }),
      setQuantity: (productId, quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity }),
      removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** 读取购物车的 Hook；必须在 CartProvider 内部使用，否则直接报错提醒调用方 */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
