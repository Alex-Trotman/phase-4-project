import React, { useState, useEffect } from "react";

const MyContext = React.createContext();

const MyProvider = (props) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [habits, setHabits] = useState([]);

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

          // Fetch habits once the user is set
          fetch("/habits", {
            // credentials: "include",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to fetch habits");
              }
            })
            .then((habitsData) => {
              console.log("habitsData", habitsData);
              setHabits(habitsData);
            })
            .catch((error) => {
              console.error("Error fetching habits", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking session status", error);
      });
  }, []);

  return (
    <MyContext.Provider
      value={{ user, setUser, categories, setCategories, habits, setHabits }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer, MyContext };
