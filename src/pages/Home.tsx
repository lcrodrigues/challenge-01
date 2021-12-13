import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const sameTask = tasks.find((task) => {
      return task.title === newTaskTitle;
    });

    if (sameTask === undefined) {
      setTasks((oldState) => [...oldState, newTask]);
    } else {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
          },
        ]
      );
    }
  }

  function handleToggleTaskDone(id: number) {
    const index = tasks.findIndex((task) => {
      return task.id === id;
    });

    if (index !== -1) {
      tasks[index].done = !tasks[index].done;
      setTasks([...tasks]);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((task) => task.id !== id));
  }

  const editTask = (id: number, newTitle: string) => {
    const index = tasks.findIndex((task) => {
      return task.id === id;
    });

    if (index !== -1) {
      tasks[index].title = newTitle;
      setTasks([...tasks]);
    }
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={editTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
