import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function UnderConstruction() {
 const  navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5">
      <Button variant="sky" onClick={()=> navigate(-1)}>Back ⬅</Button>
      <img src="/UC.png" alt="UnderConstruction" className="w-2/5 m-auto" />
    </div>
  );
}

export default UnderConstruction;
