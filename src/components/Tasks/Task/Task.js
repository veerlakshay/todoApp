import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Alert, Switch } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../../../firebase/firebaseConfig';
import { ref, update, remove } from 'firebase/database'; 


export default function Task(props) {
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    }

    const handleStatusChangePress = async () => {
        try {
            const taskRef = ref(db, `tasks/${props.task.id}`);
            const currentStatus = props.task.done;
            await update(taskRef, { done: !currentStatus });
            props.onStatusChange(props.task.id); 
        } catch (error) {
            console.error("Error updating task status: ", error);
        }
    };

    const handleRemovePress = () => {
        Alert.alert(
            'Remove Task',
            'This action will permanently delete this task. This action cannot be undone!',
            [
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            await remove(ref(db, `tasks/${props.task.id}`));
                            props.onTaskRemoval(props.task.id); 
                            setShowModal(false);
                        } catch (error) {
                            console.error("Error removing task: ", error);
                        }
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        );
    };

    return (
        <>
          <Pressable onPress={handleModalToggle}>
            <View style={styles.container}>
              <Text style={styles.title}>{props.task.description}</Text>
              <Text style={styles.text}>Id: {props.task.id}</Text>
              <Text style={styles.text}>Status: {props.task.done ? 'Completed' : 'Not Completed'}</Text>
            </View>
          </Pressable>
    
          <Modal visible={showModal} transparent={true}>
            <View style={styles.modal.container}>
              <View style={styles.modal.box}>
                <Pressable onPress={handleModalToggle}>
                  <View style={styles.close.container}>
                    <AntDesign name="closesquare" size={25} color="#c00" />
                    <Text style={styles.close.text}>Close</Text>
                  </View>
                </Pressable>
                <Text style={styles.title}>{props.task.description}</Text>
    
                <View style={styles.options}>
                  <View style={styles.switch.container}>
                    <Switch
                      value={props.task.done}
                      onValueChange={handleStatusChangePress}
                    />
                    <Pressable onPress={handleStatusChangePress}>
                      <Text style={styles.switch.label}>Toggle Status</Text>
                    </Pressable>
                  </View>
                  <View style={styles.remove.container}>
                    <Pressable onPress={handleRemovePress}>
                      <MaterialIcons name='delete-sweep' size={32} style={styles.remove.icon} />
                      <Text style={styles.remove.label}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </>
      );
}
