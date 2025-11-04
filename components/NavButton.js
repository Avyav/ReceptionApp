export function NavButton({ children, onClick }) {
    return (
      <button onClick={onClick} className="px-3 py-2 rounded-full border border-transparent hover:border-gold text-sm">{children}</button>
    )
  }
  