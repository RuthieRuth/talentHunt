export const Buttons = ({onClick, text, type = "button"}: {onClick?: () => void, text: string, type?: "button" | "reset" | "submit"}) => {
  
  return (
    <button onClick={onClick} type={type}>{text}</button>
  )
}