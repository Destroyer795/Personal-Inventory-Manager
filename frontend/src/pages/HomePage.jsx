import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.jsx';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products: ", products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
          <Text
            fontSize={{base: "22", sm: "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Current Products 🛒
          </Text>

          <SimpleGrid
            /*we will make it responsive so we need to use one more object in columns*/
            columns={{
              base: 1,
              md: 2,
              lg: 3
            }}
            spacing={10}
            w={"full"}
          >
             { products.map((product) => (
              <ProductCard key = {product._id} product = {product}/>
             )) } {/*product card is a component that we used to render each product*/}
          </SimpleGrid>
             {/*only if products length is 0, then we render the other half (no need of if else) */}
            {products.length == 0 && ( 
              <Text fontSize={'xl'} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
              No Products found 😔{" "}
              <Link to={"/create"}> {/*not from chakra*/}
                <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline"}}>
                  Create a Product
                </Text>
              </Link>
            </Text>
            )}
      </VStack>
    </Container>
  )
};

export default HomePage