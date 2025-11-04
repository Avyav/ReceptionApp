export function SecondaryButton({ children, onClick }) {
    return (
      <button onClick={onClick} className="px-6 py-3 rounded-full border border-gold bg-white text-gold text-sm">{children}</button>
    )
  }