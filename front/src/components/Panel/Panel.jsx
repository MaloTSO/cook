import './Panel.scss'

const Panel = ({className, children, noShadows}) => (
  <div className={
    'panel-container' +
    (className ? (' ' + className) : '') +
    (noShadows ? ' no-shadows' : '')
  }>
    {children}
  </div>
)

export default Panel