import serverFetch from "node-fetch";

export const client = typeof window === "undefined" ? serverFetch : fetch; // should probably set fetch as global
