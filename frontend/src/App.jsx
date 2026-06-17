import "./styles/App.css";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-brand">
            <span className="app-brand__icon" aria-hidden="true">
              ↩
            </span>
            <div>
              <h1 className="app-title">Order Returns System</h1>
              <p className="app-subtitle">Enterprise Return Management Portal</p>
            </div>
          </div>
        </div>
      </header>
      <main className="app-main">
        <DashboardPage />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Order Returns System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
