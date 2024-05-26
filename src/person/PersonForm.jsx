import { Col, Label, Row, TextInput, Select, Checkbox, Button } from "../Form/Layout";
import { FormProvided as Form, Input } from "../Form/Input";
import { useForm } from "react-hook-form";

export default function PersonForm({ person, onSubmit }) {
  const { watch, ...methods } = useForm({
    defaultValues: person,
  });
  const isDead = watch("death_indicator", person.death_indicator || false);
  return (
    <Form onSubmit={onSubmit} {...methods}>
      <Row className="mb-3">
        <Label className="col-4" htmlFor="sex">
          Sex
        </Label>
        <Col className="col-auto">
          <Input
            id="sex"
            name="sex"
            component={Select}
            options={{ "": "", M: "Male", F: "Female", U: "Unknown" }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label className="col-4" htmlFor="birth_date">
          Birth date
        </Label>
        <Col className="col-auto">
          <Input
            id="birth_date"
            name="birth_date"
            component={TextInput}
            setValueAs={(x) => (x === "" ? null : x)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label className="col-4" htmlFor="death_indicator">
          Death
        </Label>
        <Col className="col-auto">
          <Input
            id="death_indicator"
            name="death_indicator"
            component={Select}
            // prettier-ignore
            options={{ "": "", "false": "Alive", "true": "Dead" }}
            setValueAs={(x) => (x === "true" ? true : x === "false" ? false : null)}
          />
        </Col>
      </Row>
      {isDead && (
        <Row className="mb-3">
          <Label className="col-4" htmlFor="death_date">
            Death date
          </Label>
          <Col className="col-auto">
            <Input
              id="death_date"
              name="death_date"
              component={TextInput}
              setValueAs={(x) => (x === "" ? null : x)}
            />
          </Col>
        </Row>
      )}
      {isDead && (
        <Row className="mb-3">
          <Col className="offset-4">
            <Input
              id="death_date_estimated_indicator"
              name="death_date_estimated_indicator"
              component={Checkbox}
            >
              Estimated, not exact
            </Input>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="offset-4">
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
