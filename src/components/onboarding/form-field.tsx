import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { Textarea, TextareaProps } from "../ui/textarea";

type TextAreaProps = {
  istextarea: true;
} & TextareaProps;

type TextInputProps = {
  istextarea?: false;
} & InputProps;

type FormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  control: Control<TFieldValues>;

  disabled?: boolean;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    |"time"
    | "numeric"
    | "decimal";
  textareaStyle?: string;
  inputStyle?: string;
  error?: string;
  icon?: React.ReactNode;
} & (TextAreaProps | TextInputProps);

const FormInputField = <TFieldValues extends FieldValues>({
  label,
  disabled,
  placeholder,
  type = "text",
  name,
  control,
  inputMode,
  textareaStyle = "rounded-xl border border-gray-300 bg-slate-100 py-2 pl-8 text-sm font-normal text-[#4C4C4C] outline-none placeholder:text-[#666666] focus:border-2",
  inputStyle = "h-[40px] rounded-sm border border-[#FFF5E5] bg-transparent p-2 text-sm font-normal shadow-none outline-none placeholder:text-[#666666]",
  error,
  ...props
}: FormFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem className="w-full">
      {label && (
        <FormLabel className="py-2 text-sm text-[#333333]">{label}</FormLabel>
      )}
      <FormControl className="flex items-center">
        <>
          {props?.istextarea ? (
            <Textarea
              disabled={disabled}
              className={textareaStyle}
              placeholder={placeholder}
              {...props}
              {...field}
            />
          ) : (
            <Input
              disabled={disabled}
              type={type}
              {...props}
              {...field}
              inputMode={inputMode}
              className={inputStyle}
              placeholder={placeholder}
            />
          )}
        </>
      </FormControl>
      {(fieldError ?? error) && (
        <FormMessage className="text-xs font-normal text-red-500">
          {fieldError?.message ?? error}
        </FormMessage>
      )}
    </FormItem>
  );
};

export default FormInputField;
