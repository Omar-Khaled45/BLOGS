import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";

export const ListContext = createContext();

const ListContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [blogsList, setBlogsList] = useState([]);

  // Reload Function
  const reload = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Fetch Data From FireStore
  const getData = () => {
    onSnapshot(collection(db, "blogs"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setBlogsList(data);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ListContext.Provider
      value={{ reload, loading, setLoading, blogsList, setBlogsList }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
