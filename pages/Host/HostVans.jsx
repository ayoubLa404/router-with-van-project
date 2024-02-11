import { Suspense, useEffect, useState } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import { getHostVans } from '../../Components/api';
import { requireAuth } from '../../Util';

export async function Loader({ request }) {
  await requireAuth(request);
  return defer({ hostVans: getHostVans() });
}

export default function HostVans() {
  // const [vans, setVans] = useState([]);

  // useEffect(() => {
  //   fetch('/api/host/vans')
  //     .then((res) => res.json())
  //     .then((data) => setVans(data.vans));
  // }, []);

  const loadedPromise = useLoaderData();

  return (
    <section>
      <h1 className="host-van-title">Your Listed Vans</h1>
      <div className="host-van-list">
        <Suspense fallback={<h3>loading...</h3>}>
          <Await resolve={loadedPromise.hostVans}>
            {(hostVans) => {
              return hostVans.map((van) => (
                <Link
                  to={`/host/vans/${van.id}`}
                  key={van.id}
                  className="host-van-link-wrapper">
                  <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt="pic" />
                    <div className="host-van-info">
                      <h3>{van.name}</h3>
                      <p>${van.price}/day</p>
                    </div>
                  </div>
                </Link>
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
