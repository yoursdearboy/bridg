import { useNavigate } from "react-router-dom";

export default function BackButton({ className, children }) {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <button className={className} onClick={back}>
      {children}
    </button>
  );
}
