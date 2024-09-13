import { cn } from "../../utils/functions/functions.cn";

type LableType = {
  htmlFor : string
} & JSX.IntrinsicElements["label"]

const Label = ({className, children, ...restProps}: LableType) => {
  return (
    <label 
      className={cn(
        "block mb-2 text-sm font-medium",
        className
      )}
      {...restProps}
    >
      {children}
    </label>
  )
}

export default Label