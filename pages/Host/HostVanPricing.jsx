import { useOutletContext } from 'react-router-dom';

export default function HostVanPricing() {
  const { vanD } = useOutletContext();
  if (vanD)
    return (
      <h3 className="host-van-price">
        ${vanD.price} <span>/day</span>
      </h3>
    );
}
