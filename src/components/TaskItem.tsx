import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/editIcon.png";

interface TasksItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => {
    setEditMode(true);
  };

  const handleCancelEditing = () => {
    setNewTitle(item.title);
    setEditMode(false);
  };

  const handleSubmitEditing = () => {
    editTask(item.id, newTitle);
    setEditMode(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (editMode) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editMode]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={editMode}
            onSubmitEditing={() => handleSubmitEditing()}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {editMode ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={editMode}
          onPress={() => {
            Alert.alert(
              "Remover item",
              "Tem certeza que você deseja remover esse item?",
              [
                {
                  text: "Não",
                },
                {
                  text: "Sim",
                  onPress: () => {
                    removeTask(item.id);
                  },
                },
              ]
            );
          }}
          testID={`trash-${index}`}
          style={{ opacity: editMode ? 0.2 : 1 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
});
