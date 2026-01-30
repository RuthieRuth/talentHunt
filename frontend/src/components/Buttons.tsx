export const Buttons = ({onClick, text, type = "button"}) => {

  return (
    <button onClick={onClick} type={type}>{text}</button>
  )
}
