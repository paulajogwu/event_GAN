import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as FormInput, InputProps } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

export const Inputl = ({
  control,
  name,
  label,
  ...otherProps
}: {
  control: Control<FieldValues>;
  name: string;
  label: string;
} & InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-1">
            <FormLabel className="sr-only">{label}</FormLabel>
            <FormControl>
              <FormInput {...otherProps} {...field} />
            </FormControl>
            <FormMessage className="text-xs font-light" />
          </div>
        </FormItem>
      )}
    />
  );
};
