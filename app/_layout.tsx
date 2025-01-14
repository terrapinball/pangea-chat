import { AuthProvider } from "@/components/organisms/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#50BC63",
          },
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
    </AuthProvider>
  );
}
