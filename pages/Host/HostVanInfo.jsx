import { useOutletContext } from 'react-router-dom';

export default function HostVanInfo() {
  const { vanD } = useOutletContext();

  if (vanD)
    return (
      <section className="host-van-detail-info">
        <h4>
          Name: <span>{vanD.name}</span>
        </h4>
        <h4>
          Categorie: <span>{vanD.type}</span>
        </h4>
        <h4>
          Description: <span>{vanD.description}</span>
        </h4>
        <h4>
          Visibility: <span>public</span>
        </h4>
      </section>
    );
}
