import { useState, useEffect } from "react";
import { calculateReturnStatus } from "../utils/returnLogic";

function ReturnForm() {
const [formData, setFormData] = useState({
orderId: "",
customerName: "",
email: "",
itemName: "",
purchaseDate: "",
reason: "",
condition: "New",
});

const [status, setStatus] = useState("");
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");

const [returns, setReturns] = useState(() => {
const savedReturns = localStorage.getItem("returns");
return savedReturns ? JSON.parse(savedReturns) : [];
});

useEffect(() => {
localStorage.setItem("returns", JSON.stringify(returns));
}, [returns]);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = (e) => {
e.preventDefault();

if (
  !formData.orderId ||
  !formData.customerName ||
  !formData.email ||
  !formData.itemName ||
  !formData.purchaseDate ||
  !formData.reason
) {
  alert("Please fill all fields");
  return;
}
if (!formData.email.includes("@")) {
  alert("Please enter a valid email address");
  return;
}
const orderExists = returns.some(
  (item) =>
    item.orderId.toLowerCase() ===
    formData.orderId.toLowerCase()
);

if (orderExists) {
  alert("Order ID already exists!");
  return;
}
if (formData.purchaseDate > new Date().toISOString().split("T")[0]) {
  alert("Purchase date cannot be in the future");
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
  itemName: formData.itemName,
  condition: formData.condition,
  status: result,
  submittedAt: new Date().toLocaleString(),
};

setReturns([...returns, newReturn]);

setTimeout(() => {
  setStatus("");
}, 3000);

setFormData({
  orderId: "",
  customerName: "",
  email: "",
  itemName: "",
  purchaseDate: "",
  reason: "",
  condition: "New",
});

};

const totalReturns = returns.length;

const approvedReturns = returns.filter(
(item) => item.status === "Approved"
).length;

const rejectedReturns = returns.filter(
(item) => item.status.includes("Rejected")
).length;

const approvalRate =
totalReturns > 0
? ((approvedReturns / totalReturns) * 100).toFixed(0)
: 0;

const filteredReturns = returns.filter((item) => {
const matchesSearch =
String(item.orderId).toLowerCase().includes(search.toLowerCase()) ||
item.customerName.toLowerCase().includes(search.toLowerCase());

const matchesFilter =
  filter === "All"
    ? true
    : filter === "Approved"
    ? item.status === "Approved"
    : item.status.includes("Rejected");

return matchesSearch && matchesFilter;


});
const deleteReturn = (orderId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this return request?"
  );

  if (!confirmDelete) return;

  const updatedReturns = returns.filter(
    (item) => item.orderId !== orderId
  );

  setReturns(updatedReturns);
  setStatus("");
};

const getStatusBadgeClass = (itemStatus) => {
  if (itemStatus === "Approved") return "status-badge status-badge--approved";
  if (itemStatus.includes("Rejected")) return "status-badge status-badge--rejected";
  return "status-badge status-badge--default";
};

return (
  <div className="dashboard">
    <section>
      <div className="section-header">
        <h2 className="section-title">Dashboard Overview</h2>
        <p className="section-description">
          Real-time summary of return request activity
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-card__label">Total Returns</h3>
          <p className="stat-card__value">{totalReturns}</p>
        </div>

        <div className="stat-card stat-card--approved">
          <h3 className="stat-card__label">Approved</h3>
          <p className="stat-card__value">{approvedReturns}</p>
        </div>

        <div className="stat-card stat-card--rejected">
          <h3 className="stat-card__label">Rejected</h3>
          <p className="stat-card__value">{rejectedReturns}</p>
        </div>

        <div className="stat-card stat-card--rate">
          <h3 className="stat-card__label">Approval Rate</h3>
          <p className="stat-card__value">{approvalRate}%</p>
        </div>
      </div>
    </section>

    <section className="panel">
      <div className="section-header">
        <h2 className="section-title">Return Request Form</h2>
        <p className="section-description">
          Submit a new return request for review
        </p>
      </div>

      <form className="return-form" onSubmit={handleSubmit}>
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
            Reason for Return
          </label>
          <textarea
            id="reason"
            className="form-textarea"
            name="reason"
            placeholder="Describe the reason for this return"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Submit Return
          </button>
        </div>
      </form>

      {status && (
        <div className="status-alert">
          <p className="status-alert__label">Submission Status</p>
          <p className="status-alert__value">{status}</p>
        </div>
      )}
    </section>

    <section className="panel">
      <div className="section-header">
        <h2 className="section-title">Return History</h2>
        <p className="section-description">
          Search and manage submitted return requests
        </p>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon" aria-hidden="true">
            &#128269;
          </span>
          <input
            className="search-box__input"
            type="text"
            placeholder="Search Order ID or Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <select
            className="filter-dropdown__select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReturns.length === 0 ? (
              <tr>
                <td className="data-table__empty" colSpan="7">
                  No return requests found.
                </td>
              </tr>
            ) : (
              filteredReturns.map((item, index) => (
                <tr key={index}>
                  <td>{item.orderId}</td>
                  <td>{item.customerName}</td>
                  <td>{item.itemName}</td>
                  <td>{item.condition}</td>
                  <td>
                    <span className={getStatusBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.submittedAt}</td>
                  <td>
                    <button
                      className="btn btn-delete"
                      type="button"
                      onClick={() => deleteReturn(item.orderId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);
}

export default ReturnForm;
