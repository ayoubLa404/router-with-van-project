import { Suspense, useEffect, useState } from 'react';
import { Await, defer, Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { getVans } from '../../Components/api';

/*
loader is make sure that the data is surely arrived if theres an error component won't render but 
this errorElement={<Error />} in routes which is an Error component
*/
export function Loader() {
  // this will get vans array from api
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [vans, setVans] = useState([]);
  const loadedDataPromise = useLoaderData();
  // before using the loader way 6.4 v 😎
  // useEffect(() => {
  //   async function loadVans() {
  //     const data = await getVans();
  //     setVans(data);
  //   }
  //   loadVans();
  // }, []);

  // this is better if you have multiple params and you wanna edit/delete one param
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value === null) newParams.delete(key);
      else newParams.set(key, value);

      return newParams;
    });
  }

  function AwaitCallback(vans) {
    // this is important bc maybe there is no type
    const typeFilter = searchParams.get('type');
    // so wi conditionally displaying filtered vans || vans
    const displayVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vans;

    const vanElements = displayVans.map((van) => (
      <div key={van.id} className="van-tile">
        {/* pass a state to next link {to=van.id}  */}
        <Link
          to={`${van.id}`}
          state={{ searchFilter: `?${searchParams.toString()}`, typeFilter }}>
          <img alt={van.name} src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${typeFilter === 'simple' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'simple')}>
            Simple
          </button>
          <button
            className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'rugged')}>
            Rugged
          </button>
          <button
            className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : null}`}
            onClick={() => handleFilterChange('type', 'luxury')}>
            Luxury
          </button>
          {typeFilter && (
            <button
              className="van-type "
              onClick={() => handleFilterChange('type', null)}>
              clear
            </button>
          )}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h3>loading ...</h3>}>
        <Await resolve={loadedDataPromise.vans}>{AwaitCallback}</Await>
      </Suspense>
    </div>
  );
}
