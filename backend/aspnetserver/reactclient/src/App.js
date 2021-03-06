import React, { useState } from "react";

export default function App() {
  const [posts, setPost] = useState([]);

  function getPosts() {
    const url = "https://localhost:7273/get-all-posts";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromServer) => {
        console.log(postsFromServer);
        setPost(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Coinflip</h1>

            <div className="mt-5">
              <button onClick={getPosts} className="btn btn-dark btn-lg w-100">
                Get lobby's from server
              </button>
              <button
                onClick={() => {}}
                className="btn btn-secondary btn-lg w-100 mt-4"
              >
                Create new lobby
              </button>
            </div>
          </div>

          {posts.length > 0 && renderPostsTable()}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">lobbyId (PK)</th>
              <th scope="col">Name</th>
              <th scope="col">Bet</th>
              <th scope="col">change/delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button className="btn btn-dark btn-lg mx-3 my-3">
                    Change
                  </button>
                  <button className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setPost([])}
          className="btn btn-dark btn-lg w-100"
        >
          Empty React Lobby array
        </button>
      </div>
    );
  }
}
