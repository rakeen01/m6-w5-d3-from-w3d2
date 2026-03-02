import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function UpdateList(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        props.getList(null, props.elementId);
        setShow(true);
    };

    return (
        <React.Fragment>
            <Button variant="warning" onClick={handleShow} className="mx-2">
                Update List
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={props.singledata.title}
                        onChange={props.handleChange}
                        className="d-block my-3"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={props.singledata.author}
                        onChange={props.handleChange}
                        className="d-block my-3"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(evt) => {
                        props.updateList(evt, props.elementId);
                        handleClose();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
export default UpdateList;