import { PRODUCT_CATEGORIES } from '../mocks/categories'
import { Select } from '../ui/form/Select'
interface FilterByProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}

export const FilterBy = ({ onChange, value }: FilterByProps) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            className="p-2 border rounded-md"
        >
            <option value="">All Categories</option>

            {PRODUCT_CATEGORIES.map(category => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </Select>
    )
}