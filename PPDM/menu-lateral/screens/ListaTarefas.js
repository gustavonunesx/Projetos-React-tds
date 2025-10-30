import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity, // Usado para botões personalizados
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para o AsyncStorage
const STORAGE_KEY = '@my_tasks';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]); // Armazenar objetos { id, text, completed }

  // Carregar dados salvos ao iniciar o app
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null) {
          setTasks(JSON.parse(value));
        }
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar as tarefas');
      }
    };
    loadTasks();
  }, []);

  // Função para salvar os dados (reutilizável)
  const saveTasks = useCallback(async (newTasks) => {
    try {
      // Ordena as tarefas para que as concluídas fiquem no fim
      const sortedTasks = newTasks.sort((a, b) => a.completed - b.completed);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sortedTasks));
      setTasks(sortedTasks);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as tarefas');
    }
  }, []);

  // 1. Adicionar Tarefa
  const addTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Atenção', 'Digite o texto da tarefa.');
      return;
    }
    const newTask = {
      id: Date.now().toString(), // ID único
      text: taskText.trim(),
      completed: false, // Status inicial
    };
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
    setTaskText('');
    Keyboard.dismiss();
  };

  // 2. Concluir Tarefa
  const toggleComplete = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(newTasks); // Salva e reordena
  };

  // 3. Excluir Tarefa
  const deleteTask = (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem a certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            const newTasks = tasks.filter((task) => task.id !== id);
            saveTasks(newTasks);
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Item da lista
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[
          styles.taskText,
          item.completed ? styles.taskTextCompleted : {},
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity
          style={[
            styles.buttonBase,
            item.completed ? styles.uncompleteButton : styles.completeButton,
          ]}
          onPress={() => toggleComplete(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.completed ? 'Desmarcar' : 'Concluir'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBase, styles.deleteButton]}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Minha Lista de Tarefas</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite uma nova tarefa..."
              value={taskText}
              onChangeText={setTaskText}
            />
            <View style={styles.addButton}>
              <Button title="Adicionar" onPress={addTask} color={Platform.OS === 'ios' ? '#007bff' : undefined} />
            </View>
          </View>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma tarefa na lista.</Text>
            }
            style={styles.list}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1, // Ocupa a maior parte do espaço
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    borderRadius: 8,
    overflow: 'hidden', // Garante que o Button no Android respeite o borderRadius
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#007bff',
  },
  list: {
    width: '100%',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    paddingBottom: 10, // Espaço antes dos botões
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  buttonBase: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#28a745', // Verde
  },
  uncompleteButton: {
    backgroundColor: '#ffc107', // Amarelo
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Vermelho
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});

