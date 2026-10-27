/** 商品分类（面向海外消费者的英文站点） */
export type Category = 'Audio' | 'Wearables' | 'Home' | 'Accessories'

/** 商品 */
export interface Product {
  id: string
  name: string
  description: string
  /** 价格，单位：美元 */
  price: number
  category: Category
  image: string
}

/** 购物车内的一条条目：商品 + 数量 */
export interface CartItem {
  product: Product
  quantity: number
}

/** 分类筛选值：'All' 表示全部商品 */
export type CategoryFilter = 'All' | Category

/** 商品列表排序方式 */
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'
