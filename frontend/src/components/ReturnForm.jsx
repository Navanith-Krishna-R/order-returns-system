import { useState } from "react";
import { calculateReturnStatus } from "../utils/returnLogic";

const INITIAL_FORM = {
  orderId: "",
  customerName: "",
  email: "",
  itemName: "",
  purchaseDate: "",
  reason: "",
  condition: "New",
};

function ReturnForm({ returns, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError("");
  };

  const validateForm = () => {
    if (
      !formData.orderId ||
      !formData.customerName ||
      !formData.email ||
      !formData.itemName ||
      !formData.purchaseDate ||
      !formData.reason
    ) {
      return "Please fill all fields";
    }

    if (!formData.email.includes("@")) {
      return "Please enter a valid email address";
    }

    const orderExists = returns.some(
      (item) =>
        item.orderId.toLowerCase() === formData.orderId.toLowerCase()
    );

    if (orderExists) {
      return "Order ID already exists!";
    }

    if (formData.purchaseDate > new Date().toISOString().split("T")[0]) {
      return "Purchase date cannot be in the future";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    const result = calculateReturnStatus(
      formData.purchaseDate,
      formData.condition
    );

    setStatus(result);

    const newReturn = {
      orderId: formData.orderId,
      customerName: formData.customerName,
      email: formData.email,
      itemName: formData.itemName,
      reason: formData.reason,
      condition: formData.condition,
      status: result,
      submittedAt: new Date().toLocaleString(),
    };

    const success = await onSubmit(newReturn);
    if (!success) return;

    setFormData(INITIAL_FORM);
    setValidationError("");

    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  const getStatusAlertClass = () => {
    if (status === "Approved") return "status-alert status-alert--success";
    if (status.includes("Rejected")) return "status-alert status-alert--danger";
    return "status-alert";
  };

  return (
    <section className="panel" aria-labelledby="return-form-title">
      <div className="section-header">
        <h2 id="return-form-title" className="section-title">
          Return Request Form
        </h2>
        <p className="section-description">
          Submit a new product return request for review
        </p>
      </div>

      {validationError && (
        <div className="validation-message" role="alert">
          {validationError}
        </div>
      )}

      <form className="return-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="orderId">
            Order ID
          </label>
          <input
            id="orderId"
            className="form-input"
            name="orderId"
            placeholder="Enter order ID"
            value={formData.orderId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="customerName">
            Customer Name
          </label>
          <input
            id="customerName"
            className="form-input"
            name="customerName"
            placeholder="Enter customer name"
            value={formData.customerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="itemName">
            Item Name
          </label>
          <input
            id="itemName"
            className="form-input"
            name="itemName"
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="purchaseDate">
            Purchase Date
          </label>
          <input
            id="purchaseDate"
            className="form-input"
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="condition">
            Item Condition
          </label>
          <select
            id="condition"
            className="form-select"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option>New</option>
            <option>Good</option>
            <option>Damaged</option>
          </select>
        </div>

        <div className="form-group form-group--full">
          <label className="form-label" htmlFor="reason">
            Return Reason
          </label>
          <textarea
            id="reason"
            className="form-textarea"
            name="reason"
            placeholder="Describe the reason for the return"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Return"}
          </button>
        </div>
      </form>

      {status && (
        <div className={getStatusAlertClass()}>
          <p className="status-alert__label">Return Status</p>
          <p className="status-alert__value">{status}</p>
        </div>
      )}
    </section>
  );
}

export default ReturnForm;
