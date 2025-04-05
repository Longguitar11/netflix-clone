import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const res = await axios.post("/api/v1/auth/signup", credentials);

            console.log("Response from signup:", res);

            set({ user: res.data.user, isSigningUp: false });
            toast.success("Signed up successfully");
        } catch (error) {
            set({ user: null, isSigningUp: false });
            toast.error(error.response.data.error || "Failed to sign up");
        }
    },
    signin: async (credentials) => {
        set({ isSigningIn: true });
        try {
            const res = await axios.post("/api/v1/auth/signin", credentials);
            set({ user: res.data.user, isSigningIn: false });
            toast.success("Signed in successfully");
        } catch (error) {
            set({ user: null, isSigningIn: false });
            toast.error(error.response.data.error || "Failed to sign in");
        }
    },
    signout: async () => {
        set({ isLoggingOut: true });
        try {
            const res = await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success(res.data.message || "Signed out successfully");
        } catch (error) {
            set({ user: null, isLoggingOut: false });
            toast.error(error.response.data.error || "Failed to sign out");
        }

    },
    authCheck: async () => {
        // set({ isCheckingAuth: true });
        try {
            const res = await axios.get("/api/v1/auth/authCheck");
            set({ user: res.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    }
}))