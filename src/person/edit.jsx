import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import NameToolbar from "./NameToolbar";
import * as api from "./api";

// Refactor form and submit
export default function Edit() {
  const person = useLoaderData();
  const name = person.primary_name;
  const { register, watch, handleSubmit } = useForm({
    defaultValues: person,
  });
  const isDead = watch("death_indicator", false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    try {
      await api.update(data);
      navigate("/persons");
    } catch (e) {
      setError(e);
    }
  });

  const fields = {
    sex: (
      <div className="row mb-3">
        <label htmlFor="sex" className="col-sm-2 col-form-label">
          Sex
        </label>
        <div className="col-sm-10">
          <select
            id="sex"
            className="form-select"
            {...register("sex", { setValueAs: (x) => (x === "" ? null : x) })}
          >
            <option value=""></option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="U">Unknown</option>
          </select>
        </div>
      </div>
    ),
    birth_date: (
      <div className="row mb-3">
        <label htmlFor="birth_date" className="col-sm-2 col-form-label">
          Birth date
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="birth_date"
            className="form-control"
            {...register("birth_date")}
          />
        </div>
      </div>
    ),
    death_indicator: (
      <div className="row mb-3">
        <label htmlFor="death_indicator" className="col-sm-2 col-form-label">
          Death
        </label>
        <div className="col-sm-10">
          <select
            id="death_indicator"
            className="form-select"
            {...register("death_indicator", {
              setValueAs: (x) =>
                x === "true" ? true : x === "false" ? false : null,
            })}
          >
            <option value=""></option>
            <option value="false">Alive</option>
            <option value="true">Dead</option>
          </select>
        </div>
      </div>
    ),
    death_date: (
      <div className="row mb-3">
        <label htmlFor="death_date" className="col-sm-2 col-form-label">
          Death date
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="death_date"
            className="form-control"
            {...register("death_date")}
          />
        </div>
      </div>
    ),
    death_date_estimated_indicator: (
      <div className="row mb-3">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              type="checkbox"
              id="death_date_estimated_indicator"
              className="form-check-input"
              {...register("death_date_estimated_indicator")}
            />
            <label
              className="form-check-label"
              htmlFor="death_date_estimated_indicator"
            >
              Estimated, not exact
            </label>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div>
      <NameToolbar name={name} />
      {/* Refactor alert */}
      {error && <div className="alert alert-danger">{error.message}</div>}
      <form onSubmit={onSubmit}>
        {fields.sex}
        {fields.birth_date}
        {fields.death_indicator}
        {isDead && fields.death_date}
        {isDead && fields.death_date_estimated_indicator}
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
