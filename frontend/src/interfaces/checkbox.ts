export interface CheckboxProps {
    onCheck: (checked: boolean) => void,
    label: string,
    checked: boolean,
    extraStyling?: string
}