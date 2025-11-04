export function PrimaryButton({ children, onClick }) {
    return (
      <button onClick={onClick} className="px-6 py-3 rounded-full border border-gold bg-gold text-white shadow-md text-sm font-medium">{children}</button>
    )
  }
  