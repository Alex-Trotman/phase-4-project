import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const BooleanLogForm = ({ habitId, logs, setLogs, onNewLog }) => {
  const validationSchema = yup.object().shape({
    logDate: yup.string().required("Log date is required"),
    newLog: yup.string().oneOf(["true", "false"], "Select true or false").required("Status is required"),
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
        status: values.newLog === "true",
      };

      try {
        const response = await fetch(`/habits/${habitId}/logs`, {
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

  const sortedLogs = logs
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
          Status:
          <select
            id="newLog"
            name="newLog"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newLog}
            required
          >
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
            {sortedLogs.map((log) => (
              <tr key={log.id} className="log-item">
                <td>{new Date(log.log_date).toLocaleDateString()}</td>
                <td>{log.status ? "✔️" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BooleanLogForm;
