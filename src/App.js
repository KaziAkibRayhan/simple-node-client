import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {
      name,
      email,
    };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log(data);
      })
      .catch((err) => console.error(err));

    form.reset();
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <br />
          <input type="email" name="email" id="" placeholder="Email" />
          <br />
          <button type="submit">Add User</button>
        </form>
      </div>
      <h2>User: {users.length}</h2>
      <div>
        {users.map((user, idx) => (
          <p key={user._id}>
            user name: {user.name}, email: {user.email}{" "}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
