import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { styles } from "@/styles/global";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StatusBar } from "expo-status-bar";

GoogleSignin.configure({
  webClientId: '114635320668-q929qmtv3id6kih119essh44ecfbc2a3.apps.googleusercontent.com',
});
export default function RootLayout() {

  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const doLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <StatusBar style="dark" />
        <SafeAreaView />
        <Text style={styles.title}>Practic Todo</Text>
        <Pressable onPress={doLogin} style={styles.btn}>
          <Text style={styles.btnText}>Ingresar con Google</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Slot/>
    </View>
  );
}
