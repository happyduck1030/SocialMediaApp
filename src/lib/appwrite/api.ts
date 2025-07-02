import { useSignInAccount } from './../react-query/queryAndMutations';
import { account,avatars ,databases,appwriteConfig} from './config';
import {type INewUser } from "../../types/index";
import {ID, Query} from "appwrite"

import { tr } from 'zod/v4/locales';

export const createUserAccount = async (user: INewUser) => {
  try {
    // 生成合法的 userId
    const randomString = Math.random().toString(36).substring(2, 15);
    const userId = `${user.username.replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase()}_${randomString}`.substring(0, 36);

    console.log('account.create 参数:', {
      id: userId,
      email: user.email,
      password: user.password,
      name: user.name
    });

    const newAccount = await account.create(
      userId,
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw new Error("Failed to create an account");
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: user.name,
      email: user.email,
      imageUrl: avatarUrl,
      username: user.username
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveUserToDB=async(user:{
  accountId:string,
  name:string,
  email:string,
 imageUrl:URL,
 username?:string
})=>{
  try{
    console.log('databases.createDocument 参数:', {
      db: appwriteConfig.databaseId,
      collection: appwriteConfig.userCollectionId,
      id: ID.unique(),
      user
    });
    const newUser=await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )
    console.log(newUser)
    return newUser
  }catch(error){ 
    console.log(error)
  }

}
export const signInAccount =async(user:{email:string,password:string})=>{
  try{
    console.log(user)
    const session=await account.createSession(user.email,user.password)
    console.log(session)
    return session
  }catch(error){ 
    console.log(error)
  }
}

export async function getCurrentUser(){
  try{
    const currentAccount=await account.get()
    if(!currentAccount) throw Error
    const currentUser=await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId",currentAccount.$id)]
    )
    if (!currentUser.documents.length) throw Error
    return currentUser.documents[0]
  }catch(error){ 
    console.log(error)
  }
}

