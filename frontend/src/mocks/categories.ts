export const PRODUCT_CATEGORIES = [
    'medicine',
    'food', 
    'preventive',
    'hygiene',
    'medical supplies',
    'accessories'
] as const
export type ProductCategory = typeof PRODUCT_CATEGORIES[number]