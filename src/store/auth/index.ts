import { ref } from "vue";
import type { User } from "../user/types";
import { defineStore } from "pinia";
import axiosInstance from "@/services/api";
import type { ResourceResponse } from "@/types/common";
import type { LoginDto } from "./types";
import type { AxiosError } from "axios";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const useAuthStore = defineStore("auth", () => {
  const authUser = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (formData: LoginDto) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axiosInstance.post<AuthResponse>(
        "v1/auth/login",
        formData,
      );

      accessToken.value = response.data.access_token;
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      error.value = axiosError.message || "Login failed.";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAuthUser = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response =
        await axiosInstance.get<ResourceResponse<User>>("v1/auth/me");

      authUser.value = response.data.data;
      return response.data.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      error.value = axiosError.message || "Failed to fetch authenticated user.";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    error,
    authUser,
    isLoading,
    accessToken,

    login,
    fetchAuthUser,
  };
});
