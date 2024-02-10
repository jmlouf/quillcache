import { openDB } from "idb";

const initdb = async () =>
  // Create new database (using version 1 of database).
  openDB("quillcache", 1, {
    // Add database schema if not already inititalized.
    upgrade(db) {
      if (db.objectStoreNames.contains("quillcache")) {
        console.log("quillcache database already exists");
        return;
      }
      // Create new object store for data and give it key name "id" which increments automatically.
      db.createObjectStore("quillcache", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("quillcache database created");
    },
  });

// Export function to PUT to database.
export const putDb = async (data) => {
  console.log("PUT to database.");

  // Connect with database and version to use.
  const quillcacheDB = await openDB("quillcache", 1);

  // Create new transaction and specify database and data privileges.
  const tx = quillcacheDB.transaction("quillcache", "readwrite");

  // Open desired object store.
  const store = tx.objectStore("quillcache");

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
  const quillcacheDB = await openDB("quillcache", 1);

  // Create new transaction and specify database and data privileges.
  const tx = quillcacheDB.transaction("quillcache", "readonly");

  // Open desired object store.
  const store = tx.objectStore("quillcache");

  // Use .put() method to create structured clone of value.
  const request = store.getAll();

  // Confirmation of request.
  const result = await request;
  console.log("Data saved to database.", result);
};

initdb();
