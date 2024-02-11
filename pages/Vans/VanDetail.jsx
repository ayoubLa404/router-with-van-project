import React, { Suspense } from 'react';
import { Await, defer, Link, useLoaderData, useLocation } from 'react-router-dom';
import { getVans } from '../../Components/api';

export function Loader({ params }) {
  // console.log(params.id);
  // this will get vans array from api
  return defer({ van: getVans(params.id) });
}

export default function VanDetail() {
  // const { id } = useParams();
  // const [van, setVan] = React.useState(null);
  const location = useLocation();
  const loadedPromise = useLoaderData();
  // React.useEffect(() => {
  //   fetch(`/api/vans/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVan(data.vans));
  // }, [id]);

  // useLocation remember url between 2 changes
  const searched = location.state?.searchFilter ?? '';
  const typeFilter = location.state?.typeFilter ?? 'all';

  return (
    <div className="van-detail-container">
      <Link to={`..${searched}`} relative="path" className="back-button">
        &larr; back to {typeFilter} vans
      </Link>
      <Suspense fallback={<h3>loading van detail...hhh</h3>}>
        <Await resolve={loadedPromise.van}>
          {(van) => {
            return (
              <div className="van-detail">
                <img alt={van.name} src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price">
                  <span>${van.price}</span>/day
                </p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
