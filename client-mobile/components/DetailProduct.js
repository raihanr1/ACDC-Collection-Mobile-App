import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base";
export default function DetailProduct(props) {
  let id = props.route.params.id;
  const GET_PRODUCT_BY_ID = gql`
    query GET_PRODUCT_DETAIL {
      ProductDetail(id: ${id}) {
        id
        name
        slug
        description
        price
        mainImg
        UserMongoId
        Images {
          id
          ProductId
          imgUrl
        }
        Author {
          _id
          username
          email
          phoneNumber
          address
          role
        }
      }
    }
  `;
  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_BY_ID);
  if (loading) {
    return <Text>loading</Text>;
  }
  return (
    <ScrollView>
      <Box
        m={8}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: data.ProductDetail[0]?.mainImg,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            PHOTOS
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {data.ProductDetail[0]?.name}
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
              {`Price: Rp. ${data.ProductDetail[0]?.price},00`}
            </Text>
          </Stack>
          <Text fontWeight="400">{data.ProductDetail[0]?.description}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
      {data.ProductDetail[0].Images.map((el) => {
        return (
          <Box key={el.id} m={2} p={2}>
            <AspectRatio w="100%">
              <Image
                source={{
                  uri: el.imgUrl,
                }}
                height={500}
                alt="image"
              />
            </AspectRatio>
          </Box>
        );
      })}
    </ScrollView>
  );
}
