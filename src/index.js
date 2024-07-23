import React from 'react'
import { BrowserRouter  } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './components/App'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { AUTH_TOKEN } from './constants'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'  // client connection to GraphQL server
})

const authLink= setContext((_, { headers })=> {
  const token= localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token? `Bearer ${token}`: ''
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)