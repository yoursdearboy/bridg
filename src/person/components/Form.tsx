import { Col, Label, Row, TextInput, Select, Checkbox, Button } from "../../Form/Layout";
import { FormProvided as Form, Input } from "../../Form/Input";
import { useForm } from "react-hook-form";

export default function PersonForm({ person, onSubmit }) {
  const defaultValues = {
    ...person,
    death_indicator:
      typeof person.death_indicator === "boolean" ? person.death_indicator.toString() : null,
  };
  const { watch, ...methods } = useForm({ defaultValues });
  const isDead = watch("death_indicator") === "true";
  return (
    <Form onSubmit={onSubmit} {...methods}>
      <Row className="mb-3">
        <Label htmlFor="sex">Sex</Label>
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
        <Label htmlFor="birth_date">Birth date</Label>
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
        <Label htmlFor="death_indicator">Death</Label>
        <Col className="col-auto">
          <Input
            id="death_indicator"
            name="death_indicator"
            component={Select}
            options={{ "": "", false: "Alive", true: "Dead" }}
          />
        </Col>
      </Row>
      {isDead && (
        <Row className="mb-3">
          <Label htmlFor="death_date">Death date</Label>
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
          <Col>
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
        <Col>
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
