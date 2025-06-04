import { View, ActivityIndicator } from "react-native";

interface LoadingProps {
  size?: "small" | "large" | number;
  color?: string;
  className?: string;
}

const Loading = ({
  size = "large",
  color = "#2563eb",
  className = "",
}: LoadingProps) => {
  return (
    <View
      className={`flex-1 justify-center items-center bg-transparent ${className}`}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
