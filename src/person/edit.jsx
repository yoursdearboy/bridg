import { useLoaderData } from "react-router-dom";
import Card from "../Card";
import PersonEdit from "./PersonEdit";
import PersonToolbar from "./PersonToolbar";

export default function Edit() {
  const person = useLoaderData();
  return (
    <>
      <PersonToolbar person={person} />
      <div className="row">
        <div className="col-sm-4">
          <Card>
            <PersonEdit person={person} />
          </Card>
        </div>
        <div className="col-sm-8"></div>
      </div>
    </>
  );
}
