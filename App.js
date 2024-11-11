import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { db } from './src/firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(db, 'tasks');

    onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      const loadedTasks = tasksData ? Object.keys(tasksData).map(id => ({
        id,
        ...tasksData[id]
      })) : [];
      setTasks(loadedTasks);
    });

  }, []);

  const handleAddTask = (taskId, taskDescription, taskDone) => {
    const updatedTasks = [...tasks];
    updatedTasks.push({
      id: taskId,
      description: taskDescription,
      done: taskDone
    });
    setTasks(updatedTasks);
  };

  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(updatedTasks);
  };

  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Tab.Navigator>
          <Tab.Screen name='List' options={{
            headerShown: false,
            title: 'List Tasks',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='list-ul' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Tasks {...props} tasks={tasks} onStatusChange={handleStatusChange} onTaskRemoval={handleTaskRemoval} />
            )}
          </Tab.Screen>
          <Tab.Screen name='Add' options={{
            title: 'Add Task',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#008080'
            },
            tabBarIcon: ({ color, size }) => (
              <Entypo name='add-to-list' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Form {...props} onAddTask={handleAddTask} />
            )}
          </Tab.Screen>
        </Tab.Navigator>

    </NavigationContainer>
  );
}
