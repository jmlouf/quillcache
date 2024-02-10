// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");

    // check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.quillcache = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When QuillCache is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into QuillCache");
      this.quillcache.setValue(data || localData || header);
    });

    this.quillcache.on("change", () => {
      localStorage.setItem("content", this.quillcache.getValue());
    });

    // Save the content of QuillCache when QuillCache itself loses focus.
    this.quillcache.on("blur", () => {
      console.log("QuillCache has lost focus.");
      putDb(localStorage.getItem("content"));
    });
  }
}
