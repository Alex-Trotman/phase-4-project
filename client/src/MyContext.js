import React, { useState, useEffect } from "react";

const MyContext = React.createContext();

const MyProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: Check session on mount
    fetch("/check_session", {
      // credentials: "include",
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
          setUser(data);
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
