import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }

  componentDidMount() {
    this.getLists();
  }

  getLists = () => {
    this.setState({ loading: true });

    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  handleChange = (e) => {
    let title = this.state.singledata.title;
    let author = this.state.singledata.author;
    if (e.target.name === "title") {
      title = e.target.value;
    }
    if (e.target.name === "author") {
      author = e.target.value;
    }
    this.setState({
      singledata: {
        title: title,
        author: author
      }
    });
  }
  createList = () => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.singledata.title,
        author: this.state.singledata.author
      })
    })
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        })
        this.getLists();
      })
      .catch(console.log);
  }
  getList = (_evt, id) => {
    const selectedList = this.state.alldata.find(item => item.id === id);

    if (!selectedList) {
      return;
    }

    this.setState({
      singledata: {
        title: selectedList.title,
        author: selectedList.author ? selectedList.author : ""
      }
    });
  }
  updateList = (evt, id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      })
      .catch(console.log);
  }
  deleteList = (evt, id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      })
      .catch(console.log);
  }
  render() {
    const listTable = this.state.loading ? (
      <span> Loading data...</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        handleChange={this.handleChange}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3 mb-0">Book List</h1>
          <CreateList
            singledata={this.state.singledata}
            handleChange={this.handleChange}
            createList={this.createList}
          />
        </div>
        {listTable}
      </div>
    );
  }
}

export default App;
