import { forwardRef, useId } from "react"
import { cn } from "../../utils/functions/functions.cn";
import Label from "./Lable";

type InputProps = JSX.IntrinsicElements["input"]

type InputFieldProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
} & InputProps


const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, ...props}, ref) {
  return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none",
          className
        )}
      />
  )
})

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const { 
    label,
    type,
    placeholder,
    error, 
    containerClassName,
    className, 
    ...passThrough 
  } = props

  return (
    <div className={containerClassName}>
        <Label htmlFor={id}>
          {label}
          {passThrough.required && (<span>*</span>)}
        </Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          {...passThrough}
        />
        {error && <span className="text-red-500 text-sm">ⓘ {error}</span>}
      </div>
  )
})

export default InputField