import Search from '../../assets/svg/search.svg'

export default function Subheader() {
  

  return (
    <div className="flex columns-2 px-8">
      <div className="color-grey min-w-[50%]">
        Last data refrtesh: 2025.04.12 02:53
        <br/>
        * Not correctly created tournaments can show wrong results
      </div>
      <div className="columns-2 flex justify-end min-w-[50%] gap-3">
        <img src={Search} alt="search-icon" className="h-4 self-center"/>
        <input type="text" placeholder="search by tournament name" className="bg-transparent outline-none border-b-2 placeholder:text-gray-custom border-gray-custom text-white text-center font-light pb-1 focus:text-zinc-100" />
      </div>
    </div>
  )
}
