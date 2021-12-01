import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Stack,
  HStack,
  View,
  Button,
} from "native-base";
import { TouchableHighlight } from "react-native";
// import { useNavigation } from "@react-navigation/native";
export default function CardProduct({ item }) {
  // const navigation = useNavigation();
  const { Category, description, mainImg, price, name } = item;

  return (
    <TouchableHighlight
      key={item.id}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
    >
      <Stack space={2} alignItems="center">
        <HStack space={3} alignItems="center">
          <Box maxW="80" rounded="lg">
            <Box>
              <AspectRatio w="100%">
                <Image
                  source={{
                    uri: mainImg,
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {name}
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  --{Category.name}--
                </Text>
              </Stack>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    Price: {price}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </HStack>
      </Stack>
    </TouchableHighlight>
  );
}
