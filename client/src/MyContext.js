import React, { useState, useEffect } from "react";

const MyContext = React.createContext();

const MyProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: Check session on mount
    fetch("http://127.0.0.1:5555/check_session", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not authenticated");
        }
      })
      .then((data) => {
        if (!data.error) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error checking session status", error);
      });
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {props.children}
    </MyContext.Provider>
  );
};

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer, MyContext };
