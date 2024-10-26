"use client"

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, User } from 'firebase/auth';
import { auth, db } from '../database/Config';
import { collection, getDocs } from 'firebase/firestore';

export interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  products: Product[];
}

interface Product {
  id: string;
  producto: string;
  categoria: string;
  marca: string;
  imagenes: string[];
  specs: string[];
  price: number;
  price_mayoreo: number;
  sku: string;
  stock: boolean;
  wholesale: number
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_DATABASE_NAME as string));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setProducts(productsData);
        // console.log(productsData)
      } catch (error) {
        setProducts([]);
        console.error('Error al obtener la data', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      // Utiliza la función de Firebase para iniciar sesión
      await firebaseSignInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso con correo y contraseña');
      // Aquí puedes manejar cualquier lógica adicional después del inicio de sesión

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error; // Vuelve a lanzar el error para manejarlo en el componente
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/my-account";
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signInWithGoogle,
        signInWithEmailAndPassword,
        signOut,
        products,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
