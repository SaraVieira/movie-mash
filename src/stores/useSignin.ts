import axios from "axios";
import { signIn } from "next-auth/react";
import create, { GetState, SetState } from "zustand";

export const useSignIn = create((set: SetState<any>, get: GetState<any>) => ({
  error: "",
  email: "",
  password: "",
  isFilledIn: () => {
    const { email, password } = get();

    return email && password;
  },
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  signIn: async (e, router) => {
    const { email, password } = get();
    e.preventDefault();
    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/");
    } catch {}
  },
}));

export const useSignup = create((set: SetState<any>, get: GetState<any>) => ({
  error: "",
  email: "",
  password: "",
  repeatPassword: "",
  isFilledIn: () => {
    const { email, password, repeatPassword } = get();

    return email && password && repeatPassword;
  },
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  setRepeatPassword: (repeatPassword) => set({ repeatPassword }),
  createUser: async (e, router) => {
    const { email, password, repeatPassword } = get();
    set({ error: "" });
    e.preventDefault();

    if (password.length < 6) {
      set({ error: "Please choose a bigger password" });
      return;
    }

    if (password !== repeatPassword) {
      set({ error: "Your passwords do not match" });
      return;
    }

    const { data } = await axios.post("/api/signup", {
      email,
      password,
    });

    if (!data.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    router.push("/signin");
    return data;
  },
}));
