import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";


type AuthContextType = {
  user: User | null,
  loginWithGoogle: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, user => {
      if(user) {
        setUser(user)
        console.log(user)
      }
    })

    return () => unsuscribe()
  },[])

  const loginWithGoogle = async (): Promise<void> => {
    console.warn('ingresando')
    await signInWithPopup(auth,new GoogleAuthProvider())
  }

  const values = {
    user,
    loginWithGoogle
  }
  return (
    <AuthContext.Provider value={values}>
      { children }
    </AuthContext.Provider>
  )
}