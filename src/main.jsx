import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import NewClient, {action as newClientAction} from './pages/NewClient'
import Index, { loader as clientsLoader} from './pages'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import ErrorPage from './components/ErrorPage'
import { action as eliminarCLienteAction } from './components/Client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true,
        element: < Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clients/new',
        element: < NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/eliminar',
        // element: <EditarCliente/>,
        // loader: editarClienteLoader,
        action: eliminarCLienteAction,
        // errorElement: <ErrorPage/>
      }
    ]
  },  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < RouterProvider 
      router = {router}
    />
  </React.StrictMode>,
)
