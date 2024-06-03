

const Button = ({ children,onClick }) => {
  return (
    <button onClick={onClick} className="bg-black text-white px-5  py-2 rounded-md">{children}</button>
  )
}

export default Button