
import {type ReactNode} from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()

const QueryProvider = ({children}:{children:ReactNode}) => {
  return (
   <QueryClientProvider client={queryClient}>
    {children}
   </QueryClientProvider>
  )
}

export default QueryProvider