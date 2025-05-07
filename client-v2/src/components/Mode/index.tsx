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
  displayText = true,
  size,
}: {
  name: Mode
  displayImage?: boolean
  displayText?: boolean
  size?: number
}) {
  return (
    <>
      {displayImage && (
        <img 
          src={getModeImage(name)} 
          alt={`mode-${name}`} 
          className={!size ? "h-12" : undefined} 
          style={size ? { height: size } : undefined} 
        />
      )}
      {displayText && name}
    </>
  )
}
