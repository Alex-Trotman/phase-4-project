import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const MetricLogForm = ({ habitId, habitData, setHabitData, onNewLog }) => {
  const validationSchema = yup.object().shape({
    logDate: yup.string().required("Log date is required"),
    newLog: yup
      .number()
      .typeError("Value must be a number")
      .required("Value is required")
      .positive("Value must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      logDate: "",
      newLog: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const logData = {
        log_date: values.logDate,
        metric_value: parseFloat(values.newLog),
      };

      try {
        const response = await fetch(`/habits/${habitId}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        });

        if (response.ok) {
          const newLog = await response.json();
          onNewLog(newLog);
          resetForm();
        } else {
          console.error("Failed to create log");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const sortedHabitData = habitData
    .slice()
    .sort((a, b) => new Date(b.log_date) - new Date(a.log_date));

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="log-form">
        <label>
          Log Date:
          <input
            type="date"
            id="logDate"
            name="logDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.logDate}
            required
          />
          {formik.touched.logDate && formik.errors.logDate ? (
            <div className="error">{formik.errors.logDate}</div>
          ) : null}
        </label>
        <label>
          Value:
          <input
            type="number"
            id="newLog"
            name="newLog"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newLog}
            required
          />
          {formik.touched.newLog && formik.errors.newLog ? (
            <div className="error">{formik.errors.newLog}</div>
          ) : null}
        </label>
        <button type="submit" disabled={formik.isSubmitting}>Add Log</button>
      </form>
      <div className="table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {sortedHabitData.map((data) => (
              <tr key={data.id} className="log-item">
                <td>{new Date(data.log_date).toLocaleDateString()}</td>
                <td>{data.metric_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MetricLogForm;
