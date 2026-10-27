import type { Product } from '../types'

/** 拼接内置图片生成服务的 URL，按提示词生成真实感商品图 */
function img(prompt: string): string {
  return (
    'https://trae-api-cn.mchost.guru/api/ide/v1/tool_text_to_image' +
    `?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`
  )
}

/**
 * 商品目录（静态 mock 数据）。
 * 真实项目中这一层会替换为后端 API 请求；此处保持纯数据以便演示。
 */
export const PRODUCTS: Product[] = [
  // —— Audio ——
  {
    id: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    description: 'Over-ear ANC headphones with 40h battery life and plush memory-foam cups.',
    price: 129,
    category: 'Audio',
    image: img('modern matte black wireless over-ear headphones, studio product photo, light gray background'),
  },
  {
    id: 'echobuds-pro',
    name: 'EchoBuds Pro Earbuds',
    description: 'Compact true-wireless earbuds with transparency mode and a wireless charging case.',
    price: 79,
    category: 'Audio',
    image: img('white wireless earbuds with open charging case, clean product photo, soft background'),
  },
  {
    id: 'pulse-speaker',
    name: 'Pulse Mini Speaker',
    description: 'Pocket-sized Bluetooth speaker with deep bass and IPX7 waterproof shell.',
    price: 49,
    category: 'Audio',
    image: img('small cylindrical portable bluetooth speaker with fabric finish, product photo, minimal background'),
  },
  // —— Wearables ——
  {
    id: 'stride-smartwatch',
    name: 'Stride GPS Smartwatch',
    description: 'Lightweight sports watch with built-in GPS, heart-rate tracking and 10-day battery.',
    price: 159,
    category: 'Wearables',
    image: img('modern smartwatch with black silicone band showing fitness stats on screen, product photo'),
  },
  {
    id: 'flex-band',
    name: 'Flex Fitness Band',
    description: 'Slim activity band that counts steps, sleep and stress without ever needing a charge mid-week.',
    price: 59,
    category: 'Wearables',
    image: img('slim fitness tracker wristband with curved color display, product photo, clean background'),
  },
  {
    id: 'chrono-hybrid',
    name: 'Chrono Hybrid Watch',
    description: 'Classic analog watch face with smart vibration alerts and activity tracking underneath.',
    price: 119,
    category: 'Wearables',
    image: img('elegant analog wristwatch with leather strap, studio product photo, warm neutral background'),
  },
  // —— Home ——
  {
    id: 'halo-desk-lamp',
    name: 'Halo LED Desk Lamp',
    description: 'Minimalist lamp with stepless dimming and three color temperatures for late-night focus.',
    price: 39,
    category: 'Home',
    image: img('minimalist white LED desk lamp with warm glowing light, product photo, tidy desk scene'),
  },
  {
    id: 'ember-mug',
    name: 'Ember Ceramic Mug',
    description: 'Hand-glazed 350ml stoneware mug that keeps coffee hot and looks great on any desk.',
    price: 18,
    category: 'Home',
    image: img('matte sage green ceramic coffee mug, minimal product photo, soft daylight'),
  },
  {
    id: 'drift-diffuser',
    name: 'Drift Aroma Diffuser',
    description: 'Whisper-quiet ultrasonic diffuser with 300ml tank and soft ambient night light.',
    price: 29,
    category: 'Home',
    image: img('white ceramic aroma diffuser with soft mist, cozy home product photo, neutral background'),
  },
  // —— Accessories ——
  {
    id: 'trail-backpack',
    name: 'Trail Laptop Backpack',
    description: 'Water-repellent 20L backpack with padded 16-inch laptop sleeve and luggage strap.',
    price: 89,
    category: 'Accessories',
    image: img('charcoal gray slim laptop backpack, studio product photo, clean light background'),
  },
  {
    id: 'vista-sunglasses',
    name: 'Vista Polarized Sunglasses',
    description: 'UV400 polarized lenses in a featherweight tortoiseshell frame with spring hinges.',
    price: 69,
    category: 'Accessories',
    image: img('tortoiseshell polarized sunglasses, elegant product photo, beige background, soft shadow'),
  },
  {
    id: 'ridge-bottle',
    name: 'Ridge Insulated Bottle',
    description: 'Double-wall stainless bottle that keeps drinks cold for 24h or hot for 12h.',
    price: 25,
    category: 'Accessories',
    image: img('stainless steel insulated water bottle with matte finish, product photo, minimal background'),
  },
]
