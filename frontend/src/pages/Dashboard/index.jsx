import { useState, useEffect } from "react";
import Notification from "../../components/Notification"
import SummaryCategory from "../../components/Charts/SummaryCategory";
import { dashboardService } from "./../../services/dashboardService.js";
import './index.css';

function Home() {
  const [notification, setNotification] = useState(() => {
    const flashMessage = sessionStorage.getItem("flashMessage");

    if (!flashMessage) {
      return { message: "", type: "error" };
    }

    try {
      const parsedMessage = JSON.parse(flashMessage);

      if (parsedMessage.message) {
        return {
          message: parsedMessage.message,
          type: parsedMessage.type || "success",
        };
      }
    } catch {
      return {
        message: flashMessage,
        type: "success",
      };
    } finally {
      sessionStorage.removeItem("flashMessage");
    }

    return { message: "", type: "error" };
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [qtdeExpenses, setQtdeExpenses] = useState(0);

  useEffect(() => {
      async function loadTotalExpenses() {
        try {
          const data = await dashboardService.totalExpenses();
          setTotalExpenses(data.total);
        } catch (error) {
          console.error(error);
        }
      }
      async function loadQtdeExpenses() {
        try {
          const data = await dashboardService.qtdeExpenses();
          setQtdeExpenses(data.quantidade);
        } catch (error) {
          console.error(error);
        }
      }
      
      loadQtdeExpenses();
      loadTotalExpenses();
    }, []);

  return (
    <>
      <div className="container">
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ message: "", type: notification.type })
          }
        />

        <div className="dashboard">
          <div className="card" id="total-despesas">Total de despesas: R$ {totalExpenses}</div>
          <div className="card" id="qtde-despesas">Quantidade de despesas: {qtdeExpenses}</div>
          <div className="card" id="summary">
            <SummaryCategory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;