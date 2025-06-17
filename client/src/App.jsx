import { useState } from 'react'
import './App.css'
import Login from './pages/Login.jsx'
import Layout from './components/Layout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Search from './pages/Search.jsx'
import Container from './components/Container'
import Home from './pages/Home.jsx'
import PropertyDetails from './pages/Propertydeatils.jsx'
import SearchResult from './pages/SearchResult.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AddProperty from './pages/AddProperty.jsx'
import PropertyBooking from './pages/Bookproperty.jsx'
import { RecievedBookings } from './pages/BookingRecieved.jsx'
import { MyBookings } from './pages/Mybookings.jsx'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Container/>} >
        <Route path='' element={<Home/>}></Route>
        <Route path='user/login' element={<Login/>}></Route>
        <Route path='user/signup' element={<SignupPage/>}></Route>
        <Route path='property/search' element={<Search/>}></Route>
        <Route path='property/search/:location' element ={<SearchResult/>}></Route>
        <Route path='property/details/:id' element={<PropertyDetails/>}></Route>
        <Route path='property/addNew' element={<AddProperty/>}></Route>
        <Route path='property/RecievedBookings' element={<RecievedBookings/>}></Route>
        <Route path='property/myBookings' element={<MyBookings/>}></Route>
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
