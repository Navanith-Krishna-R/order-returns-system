import { useState, useEffect, useCallback } from "react";
import {
  fetchReturns as fetchReturnsApi,
  createReturn as createReturnApi,
  deleteReturn as deleteReturnApi,
} from "../services/returnService";
import DashboardStats from "../components/DashboardStats";
import ReturnForm from "../components/ReturnForm";
import ReturnTable from "../components/ReturnTable";
import AlertMessage from "../components/AlertMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";

function DashboardPage() {
  const [returns, setReturns] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadReturns = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchReturnsApi();
      setReturns(data);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.error ||
          "Failed to load return requests. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReturns();
  }, [loadReturns]);

  const handleSubmitReturn = async (newReturn) => {
    setIsSubmitting(true);
    setAlert({ type: "", message: "" });

    try {
      await createReturnApi(newReturn);
      await loadReturns();
      setAlert({
        type: "success",
        message: "Return request submitted successfully",
      });
      return true;
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.error || "Failed to save return. Please try again.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteTarget(item);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setAlert({ type: "", message: "" });

    try {
      await deleteReturnApi(deleteTarget._id);
      await loadReturns();
      setAlert({
        type: "success",
        message: "Return deleted successfully",
      });
      setDeleteTarget(null);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.error ||
          "Failed to delete return. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const totalReturns = returns.length;
  const approvedReturns = returns.filter(
    (item) => item.status === "Approved"
  ).length;
  const rejectedReturns = returns.filter((item) =>
    item.status.includes("Rejected")
  ).length;
  const approvalRate =
    totalReturns > 0
      ? ((approvedReturns / totalReturns) * 100).toFixed(0)
      : 0;

  if (isLoading) {
    return <LoadingSpinner label="Loading return requests..." />;
  }

  return (
    <div className="dashboard">
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onDismiss={() => setAlert({ type: "", message: "" })}
      />

      <DashboardStats
        totalReturns={totalReturns}
        approvedReturns={approvedReturns}
        rejectedReturns={rejectedReturns}
        approvalRate={approvalRate}
      />

      <ReturnForm
        returns={returns}
        onSubmit={handleSubmitReturn}
        isSubmitting={isSubmitting}
      />

      <ReturnTable
        returns={returns}
        search={search}
        filter={filter}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onDeleteClick={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Return Request"
        message={
          deleteTarget
            ? `Are you sure you want to delete the return request for Order ID "${deleteTarget.orderId}"? This action cannot be undone.`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default DashboardPage;
