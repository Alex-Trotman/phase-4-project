import React, { useState, useEffect } from "react";

const MyContext = React.createContext();

const MyProvider = (props) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [habits, setHabits] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/categories", {
        // credentials: "include",
      });
      if (response.ok) {
        const categoriesData = await response.json();
        console.log("categoriesData", categoriesData);
        setCategories(categoriesData);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

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
          fetchCategories();

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
      value={{
        user,
        setUser,
        categories,
        setCategories,
        habits,
        setHabits,
        fetchCategories,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer, MyContext };
