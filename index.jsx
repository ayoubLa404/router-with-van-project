import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Vans, { Loader as VansLoader } from './pages/Vans/Vans';
import VanDetail, { Loader as VanDetailLoader } from './pages/Vans/VanDetail';

import './server';
import Layout from './Components/Layout';
import NotFound from './pages/NotFound';
import Dashboard, { loader as dashboardLoader } from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './pages/Host/HostLayout';
import HostVans, { Loader as hostVansLoader } from './pages/Host/HostVans';
// prettier-ignore
import HostVansDetail , { Loader as HostVansDetailLoader }  from './pages/Host/HostVansDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import Error from './Components/Error';
import Login, { loaginAction, loginLoader } from './pages/Login';
import { requireAuth } from './Util';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loaginAction}
      />
      <Route
        path="vans"
        loader={VansLoader}
        element={<Vans />}
        errorElement={<Error />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={VanDetailLoader}
        errorElement={<Error />}
      />
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path="vans/:id"
          element={<HostVansDetail />}
          loader={HostVansDetailLoader}
          errorElement={<Error />}>
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    // after react-router 6.4 🍎🍎
    <RouterProvider router={router} />
    // before react-router 6.4 🍎🍎
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="about" element={<About />} />
    //       <Route path="vans" element={<Vans />} />
    //       <Route path="vans/:id" element={<VanDetail />} />
    //       <Route path="host" element={<HostLayout />}>
    //         <Route index element={<Dashboard />} />
    //         <Route path="income" element={<Income />} />
    //         <Route path="vans" element={<HostVans />} />
    //         <Route path="vans/:id" element={<HostVansDetail />}>
    //           <Route index element={<HostVanInfo />} />
    //           <Route path="pricing" element={<HostVanPricing />} />
    //           <Route path="photos" element={<HostVanPhotos />} />
    //         </Route>
    //         <Route path="reviews" element={<Reviews />} />
    //       </Route>
    //       <Route path="*" element={<NotFound />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
