import Standard from '../../assets/svg/mode-osu.svg'
import Taiko from '../../assets/svg/mode-taiko.svg'
import Ctb from '../..//assets/svg/mode-ctb.svg'
import Mania from '../..//assets/svg/mode-mania.svg'

export default function Header() {
  return (
    <div className="flex flex-row columns-2 w-full bg-container-main p-5 pt-4 px-8 mt-4 rounded-xl items-center">
      <h2 className="grow self-start">
        <span className="text-white text-4xl self-start">osu!</span>
        <span className="color-pink text-4xl">tc</span>
      </h2>
      <ul className="flex flex-row columns-4 gap-12 color-grey font-medium lowercase hover:text-pink-00">
        <li className="flex flex-row gap-2 items-center link-active cursor-pointer hover:text-pink-900">
            <img src={Standard} alt="mode-standard" className="h-12"/>
            Standard
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer text-pink-custom hover:text-pink-900">
            <img src={Taiko} alt="mode-taiko" className="h-12" />
            Taiko
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer hover:text-pink-900">
            <img src={Ctb} alt="mode-ctb" className="h-12" />
            CTB
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer hover:text-pink-900">
            <img src={Mania} alt="mode-mania" className="h-12"/>
            Mania
        </li>
      </ul>
    </div>
  )
}
