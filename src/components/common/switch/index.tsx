import React from 'react';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

interface ReusableSwitchFieldProps<T extends FieldValues> {
    control: Control<T>; // Correctly type the control prop
    name: Path<T>; // Ensure the name is a valid path in the schema
    label: string;
    disabled?: boolean;
    className?: string;
    labelStyle?:string;
}

function SwitchField<T extends FieldValues>({
    control,
    name,
    label,
    disabled = false,
    className = 'flex flex-row items-center justify-between p-3',
    labelStyle="text-[#1D2739] satoshi text-sm font-medium"
}: ReusableSwitchFieldProps<T>) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <FormItem className={className}>
            <FormLabel htmlFor={name} className={labelStyle}>{label}</FormLabel>
            <FormControl>
                <Switch
                    id={name as string} // Cast to string for the id
                    checked={!!value} // Ensure that value is treated as a boolean
                    onCheckedChange={(checked) => onChange(checked)}
                    disabled={disabled}
                    aria-readonly={disabled}
                />
            </FormControl>
            {error && (
                <p className="text-xs text-red-500">{error.message}</p>
            )}
        </FormItem>
    );
}

export default SwitchField;
