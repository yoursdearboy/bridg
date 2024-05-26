import { Col, Label, Row, TextInput, Select, Button } from "../Form/Layout";
import { Form, Input } from "../Form/Input";

export default function NameForm({ name }) {
  return (
    <Form defaultValues={name} onSubmit={console.log}>
      <Row className="mb-3 flex-nowrap">
        <Label className="col-2">Name</Label>
        <Col className="col-auto">
          <Input
            name="prefix"
            component={TextInput}
            placeholder="Prefix"
            style={{ maxWidth: 80 }}
          />
        </Col>
        <Col className="flex-fill">
          <Input name="family" component={TextInput} placeholder="Family" />
        </Col>
        <Col className="flex-fill">
          <Input name="middle" component={TextInput} placeholder="Middle" />
        </Col>
        <Col className="flex-fill">
          <Input name="given" component={TextInput} placeholder="Given" />
        </Col>
        <Col className="col-auto">
          <Input
            name="suffix"
            component={TextInput}
            placeholder="Suffix"
            style={{ maxWidth: 80 }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label className="col-2" htmlFor="patronymic">
          Patronymic
        </Label>
        <Col className="col-auto">
          <Input id="patronymic" name="patronymic" component={TextInput} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label className="col-2" htmlFor="use">
          Use
        </Label>
        <Col className="col-auto">
          <Input
            id="use"
            name="use"
            component={Select}
            options={["", "official", "nickname"]}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="offset-2 col-auto">
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
