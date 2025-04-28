export default function Header() {
  return (
    <div className="flex flex-row columns-2 w-full bg-container-main p-5 px-8 mt-4 rounded-xl">
      <h2 className="flex-grow-2">
        <span className="text-white">osu!</span>
        <span className="text-pink-500">tc</span>
      </h2>
      <ul className="flex flex-row columns-4 gap-18">
        <li>Standard</li>
        <li>Taiko</li>
        <li>CTB</li>
        <li>Mania</li>
      </ul>
    </div>
  )
}
