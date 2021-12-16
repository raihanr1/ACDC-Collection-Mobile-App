import React from "react";
import CustomDrawerContent from "./Navbar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoryPage from "../screens/CategoryPage";
import Homepage from "../screens/HomePage";
import { useQuery, gql } from "@apollo/client";
import { Text } from "native-base";
export default function NavbarCategoires() {
  const Drawer = createDrawerNavigator();
  const FETCH_CATEGORY = gql`
    query FETCH_CATEGORY {
      Categories {
        name
        mainImg
        id
      }
    }
  `;
  const { loading, error, data } = useQuery(FETCH_CATEGORY);
  if (loading) {
    return <Text>Loading.........</Text>;
  }
  console.log(data, ">>>>");
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Homepage} />
      {data?.Categories?.map((el) => {
        return (
          <Drawer.Screen key={el.id} name={el.name} component={CategoryPage} />
        );
      })}
    </Drawer.Navigator>
  );
}
