import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { categoriesService } from "../../services/categoriesService";
import "./index.css";

function Categories() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data = await categoriesService.getAll();
      setItems(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", description: "" });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingItem) {
        await categoriesService.update(
          {
            name: formData.name,
            description: formData.description,
          },
          editingItem.id
        );
      } else {
        await categoriesService.create({
          name: formData.name,
          description: formData.description,
        });
      }

      await loadItems();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await categoriesService.delete(id);
      await loadItems();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredItems = items.filter((item) => {
    const searchText = `${item.name || ""} ${item.description || ""}`.toLowerCase();
    return searchText.includes(search.toLowerCase());
  });

  return (
    <div className="page-shell">
      <div className="page-header">
        <h1>Categorias</h1>
      </div>

      <div className="page-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar categoria..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="button" className="primary-button" onClick={openCreateModal}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Nova Categoria</span>
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
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
                <td colSpan="3" className="empty-state">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <h2>{editingItem ? "Editar categoria" : "Nova categoria"}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Nome
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Descrição
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
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

export default Categories;