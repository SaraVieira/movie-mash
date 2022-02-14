import axios from "axios";
import { signIn } from "next-auth/react";
import create, { GetState, SetState } from "zustand";

export const useSignIn = create((set: SetState<any>, get: GetState<any>) => ({
  error: "",
  email: "",
  password: "",
  signingIn: false,
  isFilledIn: () => {
    const { email, password } = get();

    return email && password;
  },
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  signIn: async (e, router) => {
    set({ signingIn: true, error: "" });
    const { email, password } = get();
    e.preventDefault();
    try {
      const signin = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (signin.error) {
        set({ error: signin.error });
        return;
      }
      router.push("/");
    } catch {
    } finally {
      set({ signingIn: false });
    }
  },
}));

export const useSignup = create((set: SetState<any>, get: GetState<any>) => ({
  error: "",
  email: "",
  password: "",
  repeatPassword: "",
  loading: false,
  isFilledIn: () => {
    const { email, password, repeatPassword } = get();

    return email && password && repeatPassword;
  },
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  setRepeatPassword: (repeatPassword) => set({ repeatPassword }),
  createUser: async (e, router) => {
    const { email, password, repeatPassword } = get();
    set({ error: "", loading: true });
    e.preventDefault();

    if (password.length < 6) {
      set({ error: "Please choose a bigger password", loading: false });
      return;
    }

    if (password !== repeatPassword) {
      set({ error: "Your passwords do not match", loading: false });
      return;
    }
    try {
      const { data } = await axios.post("/api/signup", {
        email,
        password,
      });

      if (!data.ok) {
        set({ error: data.message || "Something went wrong!" });
      }
      router.push("/signin");
    } catch {
    } finally {
      set({ loading: false });
    }
  },
}));
