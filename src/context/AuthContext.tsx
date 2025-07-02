
import {createContext, useContext, useState, useEffect} from 'react'
import { check, set } from 'zod/v4-mini'
import {type IContextType,type IUser } from '../types'
import { getCurrentUser } from '../lib/appwrite/api'
import { useNavigate } from 'react-router-dom'
import { fi } from 'zod/v4/locales'
export const INITIAL_USER={
  id:'',
  name:'',
  email:'',
  imageUrl:'',
  username:'',
  bio:''
}
const INNITIAL_STATE={
  user:INITIAL_USER,
  isAuthenticated:false,
  isLoading:false,
  setUser:()=>{},
  setIsAuthenticated:()=>{},
  checkAuthUser:()=>false as boolean,
}
const AuthContext = createContext<IContextType>(INNITIAL_STATE)
const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const navigate=useNavigate()
  const [user,setUser]=useState<IUser>(INITIAL_USER)
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false)
  const checkAuthUser=async()=>{ 
    setIsLoading(true)
    try{
      const currentAccount=await getCurrentUser()
      if(currentAccount){
        setUser({
          id:currentAccount.$id,
          name:currentAccount.name,
          username:currentAccount.username,
          email:currentAccount.email,
          imageUrl:currentAccount.imageUrl,
          bio:currentAccount.bio
      })
        setIsAuthenticated(true)
        return true
      }
      return false
    }catch (error){
      console.log(error)
      return false
    } finally{
      setIsLoading(false)
    } 
  }
  useEffect(()=>{
    const cookieFallback=localStorage.getItem('cookieFallback')
    if  (
      cookieFallback === "[]" 
      // cookieFallback === null ||
      // cookieFallback === undefined
    ) navigate('/login')
      checkAuthUser()
  },[])
  const value={user,isLoading,setUser,isAuthenticated,setIsAuthenticated,checkAuthUser}

  return (
   <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider
export const useUserContext=()=>useContext(AuthContext)