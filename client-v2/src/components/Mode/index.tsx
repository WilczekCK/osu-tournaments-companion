import Standard from '../../assets/svg/mode-osu.svg'
import Taiko from '../../assets/svg/mode-taiko.svg'
import Ctb from '../../assets/svg/mode-ctb.svg'
import Mania from '../../assets/svg/mode-mania.svg'

function getModeImage(mode: Mode) {
  switch (mode) {
    case 'standard':
      return Standard
    case 'taiko':
      return Taiko
    case 'ctb':
      return Ctb
    case 'mania':
      return Mania
    default:
      return Standard
  }
}

export default function Mode({
  name,
  displayImage = true,
  displayText = true
}: {
  name: Mode
  displayImage?: boolean
  displayText?: boolean
}) {
  return (
    <>
      {displayImage && (
        <img src={getModeImage(name)} alt={`mode-${name}`} className="h-12" />
      )}
      {displayText && name}
    </>
  )
}
