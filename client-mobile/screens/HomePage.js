import React from "react";
import { Box, AspectRatio } from "native-base";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { gql, useQuery } from "@apollo/client";

export default function Homepage() {
  const FETCH_CATEGORY = gql`
    query Query {
      Categories {
        id
        name
        mainImg
      }
    }
  `;
  const { loading, error, data } = useQuery(FETCH_CATEGORY);
  if (loading) {
    return <Text>Loading.........</Text>;
  }
  console.log(data, loading, ">>>>");
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Text>This is our categories :</Text>
          {data?.Categories.map((el) => {
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
                <Text>{el.name}</Text>
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </SafeAreaView>
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
