import './Modal.scss'
import Panel from 'components/Panel/Panel'

const Modal = ({visible, handleClose, children}) => {

  const handleClick = (e) => {
    e?.stopPropagation()
    handleClose()
  }

  return (
    <div
      className={'modal-container' + (visible ? '' : ' not-visible')}
      onClick={handleClose}
    >
      <Panel onClick={handleClick}>
        {children}
      </Panel>
    </div>
  )
}

export default Modal