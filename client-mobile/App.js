import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Box, NativeBaseProvider, AspectRatio } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DetailPage from "./screens/DetailPage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Card from "./components/Card";
import CustomDrawerContent from "./components/Navbar";
export default function App() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    let respone = await axios({
      method: "get",
      url: "https://acdc-collection-clothing.herokuapp.com/products",
    });
    let categories = await axios({
      method: "get",
      url: "https://acdc-collection-clothing.herokuapp.com/products/categories",
    });
    setCategories(categories.data);
    setProduct(respone.data);
  }, []);
  const Drawer = createDrawerNavigator();
  function Component(props) {
    if (props.route.name === "DetailPage") {
      return <Text>masukfwqfqwfwq</Text>;
    }
    if (props.route.name === "Home") {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box>
              {categories.map((el) => {
                return (
                  <Box key={el.id} m={2} p={2}>
                    <AspectRatio w="100%">
                      <Image
                        source={{
                          uri: el.mainImg,
                        }}
                        height={500}
                        alt="image"
                      />
                    </AspectRatio>
                  </Box>
                );
              })}
              <Text>masuk gengs</Text>
            </Box>
          </ScrollView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Box m={2} p={2}>
          <FlatList
            data={
              product
                ? product.filter((el) => el.Category.name === props.route.name)
                : []
            }
            renderItem={Card}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          ></FlatList>
        </Box>
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={Component} />
          <Drawer.Screen name="Detail" component={Component} />

          <Drawer.Screen name="DetailPage" component={DetailPage} />
          {categories?.map((el) => {
            return (
              <Drawer.Screen key={el.id} name={el.name} component={Component} />
            );
          })}
        </Drawer.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
