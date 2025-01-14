import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useRouter, Href } from "expo-router";
import { View, Text, Button } from "react-native";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext?.user) {
    return (
      <View>
        <Text>You must be logged in to view this page.</Text>
        <Button
          title="Go to Login"
          onPress={() => router.push("/auth/login" as Href<'/auth/login'>)}
        />
      </View>
    );
  }

  return <>{children}</>;
}
