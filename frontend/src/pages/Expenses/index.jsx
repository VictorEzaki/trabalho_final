import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { expenseService } from "../../services/expenseService";
import { categoriesService } from "../../services/categoriesService";
import "./index.css";

function Expenses() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentUserId] = useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("user") || "{}").id || 0);
    } catch {
      return 0;
    }
  });
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    status: "PENDENTE",
    categoryId: "",
  });

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  async function loadItems() {
    setLoading(true);

    try {
      const data = await expenseService.getAll();
      setItems(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await categoriesService.getAll();
      setCategories(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setFormData({
      description: "",
      amount: "",
      date: "",
      status: "PENDENTE",
      categoryId: "",
    });
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setEditingItem(item);
    setFormData({
      description: item.description || "",
      amount: item.amount || "",
      date: item.date || "",
      status: item.status || "PENDENTE",
      categoryId: item.categoryId || "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      description: "",
      amount: "",
      date: "",
      status: "PENDENTE",
      categoryId: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const payload = {
        description: formData.description,
        amount: Number(formData.amount),
        date: formData.date,
        status: formData.status,
        categoryId: Number(formData.categoryId),
        userId: currentUserId,
      };

      if (editingItem) {
        await expenseService.update(payload, editingItem.id);
      } else {
        await expenseService.create(payload);
      }

      await loadItems();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await expenseService.delete(id);
      await loadItems();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredItems = items.filter((item) => {
    const searchText = `${item.description || ""} ${item.amount || ""} ${item.date || ""} ${item.status || ""}`.toLowerCase();
    return searchText.includes(search.toLowerCase());
  });

  return (
    <div className="page-shell">
      <div className="page-header">
        <h1>Despesas</h1>
      </div>

      <div className="page-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar despesa..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="button" className="primary-button" onClick={openCreateModal}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Nova Despesa</span>
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  Carregando despesas...
                </td>
              </tr>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{Number(item.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{categories.find((category) => category.id === item.categoryId)?.name || item.categoryId}</td>
                  <td>{item.userId}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="icon-button edit" onClick={() => openEditModal(item)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Editar</span>
                      </button>
                      <button type="button" className="icon-button delete" onClick={() => handleDelete(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  Nenhuma despesa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>{editingItem ? "Editar despesa" : "Nova despesa"}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Descrição
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <label>
                Valor
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Data
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="PAGA">PAGA</option>
                </select>
              </label>

              <label>
                Categoria
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="primary-button">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;