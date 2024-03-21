import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { styles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Image } from "expo-image";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type todoType = {
  id: string;
  user_id: string;
  title: string;
  ready: boolean;
  created_at: Date
};

const todoRef = firestore().collection('todos')

const Home = () => {
  const [todos, setTodos] = useState<todoType[] | []>([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth().currentUser;

  const toggleCompleteTask = async (item: todoType) => {
    const { id, ready } = item
    await todoRef
      .doc(id)
      .update({ ready: !ready })
  };

  const wantToDelete = (item: todoType) =>
    Alert.alert(
      "Eliminar Tarea",
      `Se va a eliminar la siguiente tarea: "${item.title}"`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: 'Eliminar', onPress: async () => await todoRef.doc(item.id).delete()}
      ]
    );

  const logOut = () =>
    Alert.alert(
      "Salir",
      'Desea cerrar sesión?',
      [
        { text: "Cancelar", style: "cancel" },
        { text: 'Salir', onPress: async () => {
          auth().signOut()
          GoogleSignin.revokeAccess()
        }}
      ]
    );

  const addTask = async () => {
    setLoading(true);
    await todoRef.add({
      user_id: user?.uid,
      title: task,
      ready: false,
      created_at: new Date()
    });
    setTask("");
    setLoading(false);
  };

  const onResult = (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
    const newTodos: todoType[] = [];
    snap.forEach((doc) =>
      newTodos.push({
        id: doc.id,
        title: doc.data().title,
        ready: doc.data().ready,
        user_id: doc.data().user_id,
        created_at: doc.data().created_at,
      })
    );
    setTodos(newTodos);
  };

  function onError(error: Error) {
    console.error(error);
  }

  useEffect(() => {
    const unsuscribe = todoRef
      .where('user_id', '==', user?.uid)
      .orderBy('created_at','desc')
      .onSnapshot(onResult, onError);

    return () => unsuscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.between}>
        <Text style={styles.title}>Practic Todo</Text>
        <Pressable onPress={logOut}>
          <Image
              source={user?.photoURL}
              style={styles.avatar}
              contentFit="cover"
            />
        </Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Tareas ({todos.length})</Text>
        <FlatList
          style={{ flex: 1 }}
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleCompleteTask(item)}
              onLongPress={() => wantToDelete(item)}
              style={styles.taskWrapper}
            >
              <Text>{item.title}</Text>
              {item.ready ? (
                <Feather name="check-square" size={24} color="#1e293b" />
              ) : (
                <Feather name="square" size={24} color="#1e293b" />
              )}
            </Pressable>
          )}
        />
      </View>
      {/* FOOTER */}
      <View style={styles.footer}>
        <SafeAreaView />
        <Text style={{ color: '#475569' }}>Agregar Tarea</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej: Comprar pan"
          onChangeText={setTask}
          value={task}
          editable={!loading}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {loading && <ActivityIndicator />}
          <Button
            onPress={addTask}
            disabled={!task || loading}
            color="#475569"
            title="Agregar"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
