import { useState } from "react";
import Notification from "../../components/Notification"
import SummaryCategory from "../../components/Charts/SummaryCategory";

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

  const series = [44, 55, 41, 17, 15];

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() =>
          setNotification({ message: "", type: notification.type })
        }
      />

      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <SummaryCategory />
      </div>
    </>
  );
}

export default Home;