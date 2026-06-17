function DashboardStats({ totalReturns, approvedReturns, rejectedReturns, approvalRate }) {
  return (
    <section className="panel" aria-labelledby="dashboard-stats-title">
      <div className="section-header">
        <h2 id="dashboard-stats-title" className="section-title">
          Dashboard Overview
        </h2>
        <p className="section-description">
          Real-time return request metrics and approval performance
        </p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <p className="stat-card__label">Total Returns</p>
          <p className="stat-card__value">{totalReturns}</p>
        </article>

        <article className="stat-card stat-card--approved">
          <p className="stat-card__label">Approved Returns</p>
          <p className="stat-card__value">{approvedReturns}</p>
        </article>

        <article className="stat-card stat-card--rejected">
          <p className="stat-card__label">Rejected Returns</p>
          <p className="stat-card__value">{rejectedReturns}</p>
        </article>

        <article className="stat-card stat-card--rate">
          <p className="stat-card__label">Approval Rate</p>
          <p className="stat-card__value">{approvalRate}%</p>
        </article>
      </div>
    </section>
  );
}

export default DashboardStats;
