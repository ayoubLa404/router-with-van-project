import { useOutletContext } from 'react-router-dom';
export default function HostVanPhotos() {
  const { vanD } = useOutletContext();
  if (vanD) return <img src={vanD.imageUrl} className="host-van-detail-image" />;
}
