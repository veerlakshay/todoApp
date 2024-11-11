import { View, Text, TextInput, Switch, Button , Keyboard } from "react-native";
import { useState } from "react";
import styles from "./styles";
import { db } from "../../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";

export default function Form(props) {

    const [taskDescription, setTaskDescription] = useState('');
    const [taskDone, setTaskDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleButtonPress = async () => {

        if (taskDescription) {
            try {
                const newTaskRef = push(ref(db, 'tasks'));
                await set(newTaskRef, {
                    description: taskDescription,
                    done: taskDone,
                });

                const taskId = newTaskRef.key;
                props.onAddTask(taskId, taskDescription, taskDone);

                setErrorMessage(null);
                setTaskDescription('');
                setTaskDone(false);
                Keyboard.dismiss();

            } catch (error) {
                console.error("Error adding task to Firebase: ", error);
            }
        }
        else {
            setErrorMessage('Description required.');
        }
    }

    const handleDescriptionChange = (value) => {
        setTaskDescription(value);
    }

    const handleStatusChange = (value) => {
        setTaskDone(value);
    }



    return (
        <View style={styles.container}>
            {
                errorMessage && (
                    <View>
                        <Text>Attention : </Text>
                        <Text>{errorMessage}</Text>
                    </View>
                )
            }
            <TextInput
                placeholder='Enter Description'
                maxLength={150}
                onChangeText={handleDescriptionChange}
                defaultValue={taskDescription}
            />

            <View>
                <Text>Completed:</Text>
                <Switch
                    value={taskDone}
                    onValueChange={handleStatusChange}
                />
            </View>

            <Button
                title="Add"
                onPress={handleButtonPress}
            />
        </View>
    );
}