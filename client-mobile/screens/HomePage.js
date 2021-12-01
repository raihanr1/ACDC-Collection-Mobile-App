import { NativeBaseProvider, Center, View, StyleSheet } from "native-base";
import { ScroolView } from "react-native";
import CardProduct from "../components/Card";
export default function Homepage() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScroolView>
          <Center flex={1} px="3">
            <CardProduct />
          </Center>
        </ScroolView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
