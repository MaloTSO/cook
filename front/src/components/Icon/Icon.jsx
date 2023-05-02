import './Icon.scss'

const Icon = ({src, onClick, disabled}) => (
  <img
    className={'icon-container' + (disabled ? ' disabled' : '')}
    src={src}
    onClick={disabled ? null : onClick}
  />
)

export default Icon