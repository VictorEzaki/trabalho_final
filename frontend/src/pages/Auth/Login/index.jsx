import { useState } from "react";
import Notification from "../../../components/Notification";
import { authService } from "../../../services/authService";
import "./index.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
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
  
  function handleChange(event) {
    const { name, value } = event.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    setLoading(true);
    setNotification({ message: "", type: "error" });
    
    try {
      const data = await authService.login(formData);
      
      sessionStorage.setItem(
        "flashMessage",
        JSON.stringify({
          message: "Login efetuado com sucesso!",
          type: "success",
        })
      );
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      
      window.location.href = "/home";
    } catch (err) {
      setNotification({
        message: err.response?.data?.message || err.message || "Erro ao fazer login",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <main className="login-page">
    <Notification
    message={notification.message}
    type={notification.type}
    onClose={() => setNotification({ message: "", type: notification.type })}
    />
    
    <section className="login-card">
    <div className="login-header">
    <h1>Entrar</h1>
    <p>Acesse sua conta para controlar suas despesas.</p>
    </div>
    
    <form onSubmit={handleSubmit} className="login-form">
    <div className="form-group">
    <label htmlFor="email">E-mail</label>
    <input
    type="email"
    id="email"
    name="email"
    placeholder="Digite seu e-mail"
    value={formData.email}
    onChange={handleChange}
    required
    />
    </div>
    
    <div className="form-group">
    <label htmlFor="password">Senha</label>
    <input
    type="password"
    id="password"
    name="password"
    placeholder="Digite sua senha"
    value={formData.password}
    onChange={handleChange}
    required
    />
    </div>
    
    <button type="submit" disabled={loading}>
    {loading ? "Entrando..." : "Entrar"}
    </button>
    </form>
    
    <p className="register-link">
    Ainda não tem uma conta? <a href="/register">Criar conta</a>
    </p>
    </section>
    </main>
  );
}

export default Login;
