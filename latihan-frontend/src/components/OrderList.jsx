import React from "react";
import "../styles/Dashboard.css";

export const OrderList = ({ orders, onEdit, onDelete }) => {
  return (
    <div className="table-responsive neon-table">
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Game</th>
            <th>Nickname</th>
            <th>Tipe Joki</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{o.title || "Genshin Impact"}</td>
              <td>{o.description || "Traveler"}</td>
              <td>{o.type || "Adventure"}</td>
              <td>
                <span
                  className={`badge ${
                    o.status === "Selesai"
                      ? "bg-success"
                      : o.status === "Proses"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {o.status || "Menunggu"}
                </span>
              </td>
              <td style={{ width: "180px" }}>
                <div className="progress progress-sm">
                  <div
                    className={`progress-bar ${
                      o.status === "Selesai"
                        ? "bg-success"
                        : o.status === "Proses"
                        ? "bg-info"
                        : "bg-secondary"
                    } progress-animated`}
                    role="progressbar"
                    style={{
                      width: o.progress || "0%",
                      transition: "width 1s ease-in-out",
                    }}
                  >
                    {o.progress || "0%"}
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(o)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(o.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
