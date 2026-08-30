import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Lander from './components/Lander.jsx'
import Achievements from './components/Achievements.jsx'
import EventsHome from './components/EventsHome.jsx'
import Squads from './components/Squads.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import AboutUs from './components/AboutUs.jsx'
import Evolve from './components/Evolve.jsx'
import NotFound from './components/NotFound.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminPanel from './components/AdminPanel.jsx'

const Home = () => (
  <div className="relative">
    <video
      className="fixed inset-0 w-full h-full object-cover -z-20"
      src="/videos/215761_medium.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="fixed inset-0 -z-10 bg-[#040d06]/50" />
    <Lander />
    <Achievements />
    <EventsHome />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='squads' element={<Squads />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path='evolve' element={<Evolve />} />
        <Route path='events' element={<Events />} />
        <Route path='about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Route>

      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route
        path='admin'
        element={
          <ProtectedRoute
            element={<AdminPanel />}
            allowedRoles={["ADMIN"]}
          />
        }
      />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)