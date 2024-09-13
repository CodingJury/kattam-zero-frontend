import { cn } from "../../utils/functions/functions.cn";

type ButtonType = JSX.IntrinsicElements["button"]

const Button = ({className, children, ...restProps}: ButtonType) => {
  return (
    <button 
      className={cn(
        "block w-full bg-blue-500 text-white p-2 rounded",
        {"bg-gray-600 cursor-not-allowed": restProps.disabled},
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button