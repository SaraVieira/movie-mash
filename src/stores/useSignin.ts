import axios from "axios";
import { signIn } from "next-auth/react";
import create, { GetState, SetState } from "zustand";

type useSignInState = {
  error: string;
  email: string;
  password: string;
  signingIn: boolean;
};

export const useSignIn = create(
  (set: SetState<useSignInState>, get: GetState<useSignInState>) => ({
    error: "",
    email: "",
    password: "",
    signingIn: false,
    isFilledIn: (): boolean => {
      const { email, password } = get();

      return Boolean(email && password);
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    signIn: async (e: any, router: any) => {
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
  })
);

type useSignupState = {
  error: string;
  email: string;
  password: string;
  repeatPassword: string;
  loading: boolean;
};

export const useSignup = create(
  (set: SetState<useSignupState>, get: GetState<useSignupState>) => ({
    error: "",
    email: "",
    password: "",
    repeatPassword: "",
    loading: false,
    isFilledIn: (): boolean => {
      const { email, password, repeatPassword } = get();

      return Boolean(email && password && repeatPassword);
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    setRepeatPassword: (repeatPassword: string) => set({ repeatPassword }),
    createUser: async (e: any, router: any) => {
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
  })
);
