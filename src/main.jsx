import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Lander from "./components/Lander.jsx";
import Achievement from "./components/Achievements.jsx";
import ProjectsHome from "./components/ProjectsHome.jsx";
import EventsHome from "./components/EventsHome.jsx";
import Squads from "./components/Squads.jsx";
import Gallery from "./components/Gallery.jsx";
import Events from "./components/Events.jsx";
import Contacts from "./components/Contacts.jsx";

/* ---------------- HOME PAGE ---------------- */
const Home = () => (
  <div className="relative w-full overflow-hidden">
    {/* Background Video */}
    <video
      className="fixed inset-0 w-full h-full object-cover -z-20"
      src="/videos/215761_medium.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="fixed inset-0 bg-black/40 -z-20" />

    <Lander />
    <Achievement />
    <ProjectsHome />
    <EventsHome />
  </div>
);

/* ---------------- ROUTER ---------------- */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="squads" element={<Squads />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="events" element={<Events />} />
      <Route path="contacts" element={<Contacts />} />
    </Route>
  )
);

/* ---------------- RENDER ---------------- */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
