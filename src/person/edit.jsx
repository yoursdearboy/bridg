import { useLoaderData } from "react-router-dom";
import Card from "../Card";
import NameToolbar from "./NameToolbar";
import PersonEdit from "./PersonEdit";

export default function Edit() {
  const person = useLoaderData();
  const name = person.primary_name;
  return (
    <div>
      <NameToolbar name={name} />
      <div className="row">
        <div className="col-sm-4">
          <Card>
            <PersonEdit person={person} />
          </Card>
        </div>
      </div>
    </div>
  );
}
