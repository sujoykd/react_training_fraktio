import { Global, ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DarkModeContext, useDarkMode } from './DarkModeContext'
import { IndexPage } from './pages/IndexPage/IndexPage'
import {
  ErrorBoundary as PersonPageError,
  loader as personLoader,
  PersonPage
} from './pages/PersonPage/PersonPage'
import { darkTheme, lightTheme } from './theme/theme'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: (
      <div>
        <h1>Error!</h1>
      </div>
    )
  },
  {
    path: '/people/:id',
    element: <PersonPage />,
    loader: personLoader,
    errorElement: <PersonPageError />
  }
])

export function Root(): JSX.Element {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DarkModeContext>
          <RootWithContext />

          <ReactQueryDevtools />
        </DarkModeContext>
      </QueryClientProvider>
    </StrictMode>
  )
}

function RootWithContext() {
  const { isDarkMode } = useDarkMode()
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={(theme) => ({
          html: {
            boxSizing: 'border-box'
          },
          '*, *:before, *:after': {
            boxSizing: 'inherit'
          },
          body: {
            margin: 0,
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(8),
            fontFamily: theme.fontFamilies.sans,
            backgroundColor: theme.colors.appBackground
          },
          a: {
            textDecoration: 'none'
          }
        })}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
