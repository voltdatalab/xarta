'use client'

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into its own file with 'use client' on top
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function TanStackQuery({ children }: {children?: ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
