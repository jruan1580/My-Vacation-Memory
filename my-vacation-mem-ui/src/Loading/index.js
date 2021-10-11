import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function Loading({show}) {
    return(
        <>
            <Modal show={show} size='sm' centered>
                
                <Modal.Body>
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                </Modal.Body>
            
            </Modal>
        </>
    );
}

export default Loading;