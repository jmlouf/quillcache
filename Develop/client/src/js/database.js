import { openDB } from "idb";

const initdb = async () =>
  // Create new database (using version 1 of database).
  openDB("content", 1, {
    // Add database schema if not already inititalized.
    upgrade(db) {
      if (db.objectStoreNames.contains("content")) {
        console.log("Content database already exists");
        return;
      }
      // Create new object store for data and give it key name "id" which increments automatically.
      db.createObjectStore("content", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("Content database created");
    },
  });

// Export function to PUT to database.
export const putDb = async (data) => {
  console.log("PUT to database.");

  // Connect with database and version to use.
  const contentDB = await openDB("content", 1);

  // Create new transaction and specify database and data privileges (read and write).
  const tx = contentDB.transaction("content", "readwrite");

  // Open desired object store.
  const store = tx.objectStore("content");

  // Use .put() method to create structured clone of value.
  const request = store.put({ data: data });

  // Confirmation of request.
  const result = await request;
  console.log("Data saved to database.", result);
};

// Export function to GET from database.
export const getDb = async () => {
  console.log("GET from database.");

  // Connect with database and version to use.
  const contentDB = await openDB("content", 1);

  // Create new transaction and specify database and data privileges (read only).
  const tx = contentDB.transaction("content", "readonly");

  // Open desired object store.
  const store = tx.objectStore("content");

  // Use .getAll() method to get saved data.
  const request = store.getAll();

  // Confirmation of request.
  const result = await request;
  console.log("Data saved to database.", result);
};

initdb();
