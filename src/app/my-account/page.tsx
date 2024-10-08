"use client";

import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import { useState } from "react";

function My_Acoount() {
  const { signInWithGoogle, signInWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      // Redirigir o hacer algo después del inicio de sesión exitoso
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <main className="flex bg-[#eeeeee] w-full h-screen">
      <section className="h-full w-[35vw] p-2 flex flex-col items-center justify-center gap-8">
        <div className="2xl:p-8 flex flex-col gap-4 justify-center items-center">
          <h1 className="font-[Poppins] font-[600] 2xl:text-3xl text-center tracking-[-1.1px]">Bienvenido de Nuevo!</h1>
          <h2 className="text-[15px]">Iniciar sesion con los siguientes proveedores</h2>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-col gap-y-2 w-full items-center">
          <button
            onClick={signInWithGoogle}
            className="text-black font-[Poppins] w-[290px] h-12 rounded-[8px] bg-white flex items-center justify-start gap-2 px-8"
          >
            <Image alt="google icons" src="/google.svg" height={20} width={20} />
            Iniciar con Google
          </button>

          <button className="text-black font-[Poppins] w-[290px] h-12 rounded-[8px] bg-white flex items-center justify-start gap-2 px-8">
            <Image alt="facebook icons" src="/facebook.svg" height={20} width={20} />
            Iniciar con Facebook
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col p-4 gap-y-3 items-center justify-center w-full">
          <input
            className="text-[15px] px-4 py-2 w-[290px] h-12 rounded-[8px] text-black"
            id="email"
            name="email"
            type="email"
            placeholder="Ingrese su Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-[15px] px-4 py-2 w-[290px] h-12 rounded-[8px] text-black"
            id="password"
            name="password"
            type="password"
            placeholder="Ingrese su Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-black text-white px-4 py-2 w-[290px] h-12 rounded-[8px]">Iniciar Sesion</button>
        </form>
      </section>

      <section className="bg-[#FFF7EF] flex flex-1 items-start justify-center">
        <img src="/banner.svg" alt="image" className="h-screen w-auto" />
      </section>
    </main>
  );
}

export default My_Acoount;
