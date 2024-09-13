import { useNavigate } from "react-router-dom";

type DropDownOptions = { 
  label: string; 
} & (
  | { href: string; onClick?: never } 
  | { onClick: () => void; href?: never }
)

type DropDownMenuProps = {
  heading: string
  items: DropDownOptions[]
}

const DropdownMenu = ({heading, items}: DropDownMenuProps) => {
  const navigate = useNavigate()

  const handleItemClick = (item: DropDownOptions) => {
    const {href, onClick} = item;
    if(onClick) onClick()
    if(href) navigate(href)
  }
  
  return (
    <div className="relative inline-block group">
        <button className='h-[var(--header-height)]'>{heading}</button>
        <div className='absolute hidden mt-0 bg-gray-200 min-w-[160px] shadow-md z-10 group-hover:block right-0'>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item)}
              className="block px-4 py-2 no-underline hover:bg-gray-400 cursor-pointer"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
  )
}

export default DropdownMenu