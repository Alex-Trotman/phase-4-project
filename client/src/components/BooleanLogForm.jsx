import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const BooleanLogForm = ({ habitId, logs, setLogs, onNewLog }) => {
  const validationSchema = yup.object().shape({
    logDate: yup.string().required("Log date is required"),
    newLog: yup
      .string()
      .oneOf(["true", "false"], "Select true or false")
      .required("Status is required"),
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
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="log-form space-y-4 w-full max-w-md"
      >
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Log Date:
            <input
              type="date"
              id="logDate"
              name="logDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.logDate}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.logDate && formik.errors.logDate ? (
              <div className="error text-red-500 text-sm">
                {formik.errors.logDate}
              </div>
            ) : null}
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Status:
            <select
              id="newLog"
              name="newLog"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newLog}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            {formik.touched.newLog && formik.errors.newLog ? (
              <div className="error text-red-500 text-sm">
                {formik.errors.newLog}
              </div>
            ) : null}
          </label>
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Add Log
        </button>
      </form>
      <div className="table-container mt-6 w-full max-w-4xl">
        <table className="log-table w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log) => (
              <tr key={log.id} className="log-item text-gray-700">
                <td className="p-2">
                  {new Date(log.log_date).toLocaleDateString()}
                </td>
                <td className="p-2">{log.status ? "✔️" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooleanLogForm;
