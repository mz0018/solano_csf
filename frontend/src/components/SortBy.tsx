import { SORT_OPTIONS } from '../mocks/sortOptions'
import { Select } from '../ui/form/Select'
interface SortByProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}
export const SortBy = ({ onChange, value }: SortByProps) => {
    return (
        <Select value={value} onChange={onChange}>
            <option value="">Default</option>
            {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    )
}