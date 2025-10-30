import React, { useState, useEffect, useCallback } from 'react';

// Chave para o localStorage (substituindo AsyncStorage)
const STORAGE_KEY = '@my_items';

// Componente de Modal para confirmação
function ConfirmationModal({ isVisible, onConfirm, onCancel, title, message }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={styles.modalTitle}>{title}</h3>
        <p>{message}</p>
        <div style={styles.modalButtons}>
          <button onClick={onCancel} style={styles.modalButtonCancel}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={styles.modalButtonConfirm}>
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Carregar dados salvos ao iniciar o app (usando localStorage)
  useEffect(() => {
    const loadData = () => {
      try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (value !== null) {
          setItems(JSON.parse(value));
        }
      } catch (e) {
        console.error('Erro ao carregar os dados:', e);
        setError('Não foi possível carregar os dados');
      }
    };
    loadData();
  }, []); // O array de dependências vazio garante que isso rode só uma vez

  // Função para salvar os dados (reutilizável)
  const saveData = useCallback(
    (newItems) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        setItems(newItems);
      } catch (e) {
        console.error('Erro ao salvar os dados:', e);
        setError('Não foi possível salvar os dados');
      }
    },
    [setItems]
  );

  // Adicionar item
  const addItem = () => {
    setError(''); // Limpa erros anteriores
    if (text.trim() === '') {
      setError('Digite um item antes de adicionar.');
      return;
    }
    const newItems = [...items, text.trim()];
    saveData(newItems); // Usa a função de salvar
    setText(''); // Limpa o input
  };

  // Funções do Modal
  const handleClearRequest = () => {
    setShowModal(true); // Mostra o modal de confirmação
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  // Limpar todos os dados (confirmado)
  const handleModalConfirm = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setItems([]); // Limpa o estado
      setText(''); // Limpa o input
    } catch (e) {
      console.error('Erro ao limpar os dados:', e);
      setError('Não foi possível limpar os dados');
    }
    setShowModal(false); // Esconde o modal
  };

  return (
    <div style={styles.safeArea}>
      {/* <StatusBar /> não é usado em React web desta forma */}
      <div style={styles.container}>
        <h1 style={styles.title}>Lista Persistente (Web)</h1>

        <input
          type="text"
          style={styles.input}
          placeholder="Digite um item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Mensagem de Erro (substitui Alert) */}
        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.buttons}>
          <button onClick={addItem} style={styles.button}>
            Adicionar
          </button>
          <button
            onClick={handleClearRequest}
            style={{ ...styles.button, ...styles.buttonClear }}
          >
            Limpar
          </button>
        </div>

        {/* Lista de Itens (substitui FlatList) */}
        <div style={styles.list}>
          {items.length === 0 ? (
            <p style={styles.emptyText}>Nenhum item salvo</p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.itemText}>
                    {index + 1}. {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isVisible={showModal}
        title="Limpar Tudo?"
        message="Tem a certeza que deseja apagar todos os itens?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
}

// Estilos (convertidos de StyleSheet para objetos de estilo CSS-in-JS)
const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: 'calc(100% - 26px)', // Ajuste para padding
    borderColor: '#ccc',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontSize: '16px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  },
  buttonClear: {
    backgroundColor: '#dc3545',
  },
  list: {
    width: '100%',
  },
  listItem: {
    listStyleType: 'none',
    width: '100%',
    padding: '15px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff',
    borderRadius: '5px',
    marginBottom: '5px',
    boxSizing: 'border-box', // Garante que o padding não quebre o layout
  },
  itemText: {
    fontSize: '16px',
  },
  emptyText: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  // Estilos do Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    width: '300px',
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: '15px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '25px',
  },
  modalButtonCancel: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
  },
  modalButtonConfirm: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
  },
};

