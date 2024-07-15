import React, { useState, useEffect } from "react";

const MyContext = React.createContext();

const MyProvider = (props) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Check session on mount
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
          // Fetch categories once the user is set
          fetch("/categories", {
            // credentials: "include",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to fetch categories");
              }
            })
            .then((categoriesData) => {
              console.log("categoriesData", categoriesData);
              setCategories(categoriesData);
            })
            .catch((error) => {
              console.error("Error fetching categories", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking session status", error);
      });
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser, categories, setCategories }}>
      {props.children}
    </MyContext.Provider>
  );
};

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer, MyContext };
