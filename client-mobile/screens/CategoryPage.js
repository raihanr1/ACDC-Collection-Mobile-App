import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import CardProduct from "../components/Card";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DetailProduct from "../components/DetailProduct";
export default function Homepage({ route }) {
  const Stack = createStackNavigator();
  const FETCH_PRODUCT = gql`
    query FetchProduct {
      Products {
        id
        name
        slug
        description
        price
        mainImg
        UserMongoId
        Category {
          id
          name
          mainImg
        }
        Images {
          id
          ProductId
          imgUrl
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(FETCH_PRODUCT);
  if (loading) {
    return <Text>Loading.........</Text>;
  }
  function ListProduct(props) {
    const [productFiltered, setProductFiltered] = useState([]);
    useEffect(() => {
      let productFilter = data.Products.filter((el) => {
        if (el.Category.name === route.name) {
          return el;
        }
      });
      setProductFiltered(productFilter);
    }, []);
    return (
      <ScrollView scrool>
        {productFiltered.map((el) => {
          return (
            <TouchableHighlight
              key={el.id}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() =>
                props.navigation.navigate("DetailProduct", { id: el.id })
              }
            >
              <CardProduct key={el.id} item={el} />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Product" component={ListProduct} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
    </Stack.Navigator>
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
