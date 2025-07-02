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
  password: z.string().min(4, { message: "Password must be at least 8 characters" }).max(44),
  email: z.string().email(),
})
const SignInForm = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const isLoading = true
  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  })
  const { mutateAsync: signInAccount } = useSignInAccount()

  // 2. Define a submit handler.
  async function onSubmit(user: z.infer<typeof formSchema>) {

  
    const session = await signInAccount(user)
    if (!session) {
      return toast("Signup failed, please try again", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
      })
    }
    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast(('Sign Up failed . Please try again'))
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 mx-auto flex-center flex-col'>
        <img src={logo} alt="logo" />
        <h1 className="text-2xl font-semibold md:pt-4 sm:pt-12">Sign in to your account</h1>
        <p className='text-light-3 small-medium mt-2'>Welcome back ! Please sign in to your account</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full gap-5  mt-4 flex flex-col">
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Please input your password" className="shad-input"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
          <Button type="submit" className='shad-button_primary'>{isUserLoading ? (<div className='flex-center gap-2'><Loader />Loading...</div>) : "Sign In"}</Button>
          <p className='text-light-3 small-regular'>
            Don&apos;t have an account ?<Link to="/signup" className='ml-4 text-primary-500  hover:underline'>Sign Up</Link>
          </p>
        </form>
      </div>

    </Form>
  )

}

export default SignInForm