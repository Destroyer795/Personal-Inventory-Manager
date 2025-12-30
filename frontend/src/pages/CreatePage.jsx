import { Box, Container, VStack, Heading, useColorModeValue, Input, Button, useToast, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error!!",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }
    else {
      toast({
        title: "Success!!",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true 
      })
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}> 
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} my={10}>
          <Text
            fontSize={{base: "22", sm: "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            color={useColorModeValue("gray.800", "white")}
          >
            Create Product
          </Text>
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"sm"}
          borderWidth={1}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
