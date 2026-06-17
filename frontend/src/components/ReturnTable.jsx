function getStatusBadgeClass(status) {
  if (status === "Approved") return "status-badge status-badge--approved";
  if (status.includes("Rejected")) return "status-badge status-badge--rejected";
  return "status-badge status-badge--default";
}

function ReturnTable({
  returns,
  search,
  filter,
  onSearchChange,
  onFilterChange,
  onDeleteClick,
}) {
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

  return (
    <section className="panel" aria-labelledby="return-history-title">
      <div className="section-header">
        <h2 id="return-history-title" className="section-title">
          Return History
        </h2>
        <p className="section-description">
          Search, filter, and manage submitted return requests
        </p>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box__icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="text"
            className="search-box__input"
            placeholder="Search Order ID or Customer"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search returns"
          />
        </div>

        <div className="filter-dropdown">
          <select
            className="filter-dropdown__select"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            aria-label="Filter by status"
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
                <td colSpan="7" className="data-table__empty">
                  No return requests found
                </td>
              </tr>
            ) : (
              filteredReturns.map((item) => (
                <tr key={item._id}>
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
                      type="button"
                      className="btn btn-delete"
                      onClick={() => onDeleteClick(item)}
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
  );
}

export default ReturnTable;
