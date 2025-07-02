import React, { use, useContext } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Button } from '../../components/ui/button'
import logo from '../../../public/assets/images/logo.svg'
import { toast } from "sonner"
import { useCreateUserAccount, useSignInAccount } from '../../lib/react-query/queryAndMutations'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { email } from 'zod/v4-mini'
import { createUserAccount } from '../../lib/appwrite/api'
import Loader from '../../components/ui/shared/Loader'
import { useUserContext } from '../../context/AuthContext'

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(44),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(44),
  email: z.string().email(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(44),

})
const SignUpForm = () => {
  const {checkAuthUser,isLoading:isUserLoading}=useUserContext()
  const isLoading = true
  const navigate=useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  })
  const {mutateAsync:createUserAccount,isPending:isCreatingAccount}=useCreateUserAccount()
  const{mutateAsync:signInAccount,isLoading:isSigningIn}=useSignInAccount()
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const newUser=await createUserAccount(values)
    if(!newUser){
      return toast("Signup failed, please try again", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },})
  }
    const session=await signInAccount({
      email:values.email,
      password:values.password
    })
    if(!session){
      return toast("Signup failed, please try again", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
      })
    }
    const isLoggedIn=await checkAuthUser()
    if(isLoggedIn){
      form.reset()
      navigate('/')
    }else{
      return toast(('Sign Up failed . Please try again'))
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 mx-auto flex-center flex-col'>
        <img src={logo} alt="logo" />
        <h1 className="text-2xl font-semibold md:pt-4 sm:pt-12">Create a new account</h1>
        <p className='text-light-3 small-medium mt-2'>To use this app, Please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full gap-5  mt-4 flex flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Please input your username" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="Please input your password" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="Please input your email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Please input your email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <Button type="submit" className='shad-button_primary'>{isCreatingAccount ? (<div className='flex-center gap-2'><Loader/>Loading...</div>): "Sign up"}</Button>
            <p className='text-light-3 small-regular'>
            Already have an account? <Link to="/login" className='ml-4 text-primary-500  hover:underline'>Sign in</Link>
            </p>
        </form>
      </div>

    </Form>
  )

}

export default SignUpForm