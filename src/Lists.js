import React from 'react';
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";
import "bootstrap/dist/css/bootstrap.min.css";

function Lists(props) {
    let listRows = []
    props.alldata.forEach(element => {
        listRows.push(
            <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.author}</td>
                <td>
                    <UpdateList
                        elementId={element.id}
                        singledata={props.singledata}
                        handleChange={props.handleChange}
                        getList={props.getList}
                        updateList={props.updateList}
                    />
                </td>
                <td>
                    <DeleteList
                        elementId={element.id}
                        singledata={props.singledata}
                        getList={props.getList}
                        deleteList={props.deleteList}
                    />
                </td>
            </tr>
        )
    });
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {listRows}
            </tbody>
        </table>
    );
}
export default Lists;