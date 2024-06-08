import { useForm, useFormContext } from "react-hook-form";
import { Input } from "../../Form/Input";
import { Checkbox, Col, Label, Row, Select, TextInput } from "../../Form/Layout";

export const usePersonForm = ({ defaultValues = {} }: any = {}) => {
  defaultValues = {
    ...defaultValues,
    death_indicator:
      typeof defaultValues.death_indicator === "boolean"
        ? defaultValues.death_indicator.toString()
        : null,
  };
  return useForm({ defaultValues });
};

export default function PersonForm() {
  const { watch } = useFormContext();
  const isDead = watch("death_indicator") === "true";
  return (
    <>
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
      <Row className={`mb-3 ${isDead ? "" : "d-none"}`}>
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
      <Row className={`mb-3  ${isDead ? "" : "d-none"}`}>
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
    </>
  );
}
