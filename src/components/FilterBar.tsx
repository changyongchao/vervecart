import type { CategoryFilter, SortKey } from '../types'

/** 全部分类（'All' 表示不过滤） */
const CATEGORIES: CategoryFilter[] = ['All', 'Audio', 'Wearables', 'Home', 'Accessories']

/** 排序选项 */
const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
]

interface Props {
  category: CategoryFilter
  onCategoryChange: (value: CategoryFilter) => void
  sortBy: SortKey
  onSortChange: (value: SortKey) => void
  resultCount: number
}

/**
 * 筛选栏：左侧分类标签（手机端横向滚动），右侧结果数 + 排序下拉框。
 */
export default function FilterBar({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="category-chips" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={c === category ? 'chip chip-active' : 'chip'}
            onClick={() => onCategoryChange(c)}
            aria-pressed={c === category}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="sort-row">
        <span className="result-count" aria-live="polite">
          {resultCount} item{resultCount === 1 ? '' : 's'}
        </span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
