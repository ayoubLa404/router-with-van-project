import { Suspense, useEffect, useState } from 'react';
import { Await, defer, Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';

import { getHostVans } from '../../Components/api';
import { requireAuth } from '../../Util';

export async function Loader({ request, params }) {
  await requireAuth(request);
  return defer({ vanD: getHostVans(params.id) });
}

export default function HostVansDetail() {
  // const { id } = useParams();
  // const [vanD, setVanD] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/host/vans/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVanD(data.vans[0]));
  // }, []);

  const loadedPromise = useLoaderData();

  return (
    <section className="van-detail-container">
      <Suspense fallback={<h3>loading host vans detail ...</h3>}>
        <Await resolve={loadedPromise.vanD}>
          {(vanD) => {
            return (
              <>
                <Link to=".." relative="path" className="back-button">
                  &larr; back to all vans
                </Link>
                <div className="host-van-list">
                  <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                      <img src={vanD.imageUrl} alt="p" width={150} />
                      <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${vanD.type}`}>{vanD.type}</i>
                        <h3>{vanD.name}</h3>
                        <h4>${vanD.price}/day</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="host-van-detail-nav">
                  <NavLink to="." end>
                    Details
                  </NavLink>
                  <NavLink to="pricing">Pricing</NavLink>
                  <NavLink to="photos">Photos</NavLink>
                </nav>
                <Outlet context={{ vanD }} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
