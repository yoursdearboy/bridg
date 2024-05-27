import { Col, Label, Row, TextInput, Select, Button } from "../../Form/Layout";
import { Form, Input } from "../../Form/Input";

export default function NameForm({ name, onSubmit }) {
  return (
    <Form defaultValues={name} onSubmit={onSubmit}>
      <Row className="mb-3 flex-nowrap">
        <Col className="col-auto">
          <Label htmlFor="prefix">Prefix</Label>
          <Input id="prefix" name="prefix" component={TextInput} style={{ maxWidth: 80 }} />
        </Col>
        <Col className="flex-fill">
          <Label htmlFor="family">Family</Label>
          <Input id="family" name="family" component={TextInput} />
        </Col>
        <Col className="flex-fill">
          <Label htmlFor="middle">Middle</Label>
          <Input id="middle" name="middle" component={TextInput} />
        </Col>
        <Col className="flex-fill">
          <Label htmlFor="given">Given</Label>
          <Input id="given" name="given" component={TextInput} />
        </Col>
        <Col className="col-auto">
          <Label htmlFor="suffix">Suffix</Label>
          <Input id="suffix" name="suffix" component={TextInput} style={{ maxWidth: 80 }} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label htmlFor="patronymic">Patronymic</Label>
        <Col className="col-auto">
          <Input id="patronymic" name="patronymic" component={TextInput} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Label htmlFor="use">Use</Label>
        <Col className="col-auto">
          <Input id="use" name="use" component={Select} options={["", "official", "nickname"]} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
