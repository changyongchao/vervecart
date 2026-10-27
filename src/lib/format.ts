/**
 * 价格格式化工具。
 * 面向海外消费者，统一使用美式美元格式（如 $129.00）。
 */
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(price: number): string {
  return priceFormatter.format(price)
}
