import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'c9d37f8f81a0dcce4f011e2dd49709a3e7be93e6', queries,  });
export default client;
  