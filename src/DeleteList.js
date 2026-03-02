import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteList(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Button variant="danger" onClick={
                (evt) => {
                    props.getList(evt, props.elementId);
                    handleShow();
                }
            }>
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text"
                        name="title"
                        placeholder="Title"
                        value={props.singledata.title}
                        disabled={true}
                        className="d-block my-3"
                    />
                    <input type="text"
                        name="author"
                        placeholder="Author"
                        value={props.singledata.author}
                        disabled={true}
                        className="d-block my-3"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={(evt) => {
                        props.deleteList(evt, props.elementId);
                        handleClose();
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
export default DeleteList;