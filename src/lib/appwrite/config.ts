import {Client ,Account,Databases,Storage,Avatars} from "appwrite";
export const appwriteConfig={
  projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url:import.meta.env.VITE_APPWRITE_URL,
  databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postsCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  saveCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  
}

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// client
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
