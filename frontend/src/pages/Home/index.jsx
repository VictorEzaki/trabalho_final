import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import Notification from "../../components/Notification"

function Home() {
  const chartRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(() => {
      const flashMessage = sessionStorage.getItem("flashMessage");
  
      if (!flashMessage) {
        return {
          message: "",
          type: "error",
        };
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
  
      return {
        message: "",
        type: "error",
      };
    });

  useEffect(() => {
    const options = {
      series: [44, 55, 41, 17, 15],
      labels: ["Alimentação", "Transporte", "Lazer", "Saúde", "Outros"],
      chart: {
        type: "donut",
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <>
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={() => setNotification({ message: "", type: notification.type })}
    />
    <div ref={chartRef}></div>;
  </>
}

export default Home;