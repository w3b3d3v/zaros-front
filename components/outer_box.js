export default function OuterBox({ children }) {
  return (
    <div className="place-content-around grid sm:text-center bg-stone-900 lg:text-center shadow shadow-white rounded-lg p-8">
      {children}
    </div>
  )
}
