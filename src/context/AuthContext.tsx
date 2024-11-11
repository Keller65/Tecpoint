"use client";

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, User } from 'firebase/auth';
import { auth, db } from '../database/Config';
import { collection, getDocs } from 'firebase/firestore';

export interface ProductInterface {
  categoria: string[];
  descripcion: string;
  fecha_agregado: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
  imagenes: { [key: string]: { id: string; img: string } }; // Cambiamos a un objeto con claves dinámicas
  marca_producto: {
    logo: string;
    marca: string;
  };
  precio: {
    detalle: number;
    mayoreo: number;
  };
  producto: string;
  sku: string;
  slug: string;
  upc: string;
}


export interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  products: ProductInterface[];
  fetchProducts: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductInterface[]>([]);

  // Función para obtener los productos desde Firebase
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_DATABASE_NAME as string));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProductInterface[];
      setProducts(productsData);
      console.log(productsData)
    } catch (error) {
      setProducts([]); // Si ocurre un error, inicializamos el estado como un arreglo vacío
      console.error('Error al obtener los productos', error);
    }
  };

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
      await firebaseSignInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso con correo y contraseña');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
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
        fetchProducts, // Aseguramos que la función fetchProducts esté disponible en el contexto
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
