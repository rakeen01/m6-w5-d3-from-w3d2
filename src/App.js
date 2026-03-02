import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }
  getLists = () => {
    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
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
        id: this.state.alldata.length ? (this.state.alldata.length + 1).toString() : "0",
        title: this.state.singledata.title,
        author: this.state.singledata.author,
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
  getList = (evt, id) => {
    this.setState(
      {
        singledata: {
          title: "Loading...",
          author: "Loading..."
        }
      },
      () => {
        fetch(`http://localhost:5000/posts/${id}`)
          .then(res => res.json())
          .then(result => {
            this.setState({
              singledata: {
                title: result.title,
                author: result.author ? result.author : ""
              }
            });
          });
        this.getLists();
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
      <div className="container" >
        <span className="title-bar">
          <button type="button" className="btn btn-primary" onClick={this.getLists}>
            Get Lists
          </button>
          <CreateList
            singledata={this.state.singledata}
            handleChange={this.handleChange}
            createList={this.createList}
          />
        </span>
        {listTable}
      </div>
    );
  }
}

export default App;
