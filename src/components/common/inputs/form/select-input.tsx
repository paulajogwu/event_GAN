import React from "react";
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// interface SelectInputProps<TFieldValues extends FieldValues> {
//   control: Control<TFieldValues>;
//   name: FieldPath<TFieldValues>;
//   label?: string;
//   placeholder?: string;
//   options: { value: string; label: string }[];
//   icon?: React.ReactNode;
//   className?: string;
//   triggerClassName?: string;
//   contentClassName?: string;
//   disabled?: boolean;
//   error?: string;
// }

interface SelectInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  error?: string;
  onValueChange?: (value: string) => void; // Add this line
}


const SelectInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  icon,
  className = "",
  triggerClassName = "  bg-[#FCFDFE] h-[52px]  border-[#F0F6FF] border  text-[#4C4C4C]",
  contentClassName = "bg-white",
  disabled = false,
  error,
  onValueChange, // Accept the custom onValueChange handler
  ...props
}: SelectInputProps<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  const handleValueChange = (value: string) => {
    onChange(value); // React Hook Form's onChange handler
    if (onValueChange) {
      onValueChange(value); // Custom onValueChange handler, if provided
    }
  };

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Select onValueChange={handleValueChange} disabled={disabled} {...props}>
          <SelectTrigger className={triggerClassName}>
            <div className="flex flex-row items-center gap-x-2">
              {icon && <span className="">{icon}</span>}
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent className={contentClassName}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {(fieldError ?? error) && (
        <FormMessage className="text-xs font-normal text-red-500">
          {fieldError?.message ?? error}
        </FormMessage>
      )}
    </FormItem>
  );
};


export default SelectInput;
