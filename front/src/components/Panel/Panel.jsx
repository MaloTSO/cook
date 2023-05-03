import './Panel.scss'

const Panel = ({onClick, className, children, noShadows}) => (
  <div
    onClick={onClick}
    className={
      'panel-container' +
      (className ? (' ' + className) : '') +
      (noShadows ? ' no-shadows' : '')
    }
  >
    {children}
  </div>
)

export default Panel