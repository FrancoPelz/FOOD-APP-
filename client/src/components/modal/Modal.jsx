import styles from '../modal/Modal.css'

const Modal= ({children, isOpen, closeModal}) => {

    const handleModalContainerClick = e => e.stopPropagation();
    return(
        <article class={`modal ${isOpen && "is_open"}`} onClick={closeModal}>
            <div class="modal_container" onClick={handleModalContainerClick}>
                <button class="modal_close" onClick={closeModal}>X</button>
                {children}
            </div>
        </article>
    )
}

export default Modal;
