import { useState } from 'react'
import './App.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Container from './components/Container'
import Home from './pages/Home.jsx'
import PropertyDetails from './pages/Propertydeatils.jsx'
import SearchResult from './pages/SearchResult.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AddProperty from './pages/AddProperty.jsx'
import PropertyBooking from './pages/Bookproperty.jsx'
import { UserDashboard } from './pages/UserDashboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Container/>} >
        <Route path='' element={<Home/>}></Route>
        <Route path='user/login' element={<Login/>}></Route>
        <Route path='user/signup' element={<SignupPage/>}></Route>
        <Route path='user/Dashboard' element={<UserDashboard/>}></Route>
        <Route path='property/search/:location' element ={<SearchResult/>}></Route>
        <Route path='property/details/:id' element={<PropertyDetails/>}></Route>
        <Route path='property/addNewProperty' element={<AddProperty/>}></Route>
        <Route path='property/booking' element={<PropertyBooking/>}></Route>
      </Route>
      </>
  ))


  return (
    <>
    <RouterProvider router={router} >
     </RouterProvider>
    </>
  )
}

export default App
