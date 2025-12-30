//Navbar.jsx
import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react';
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode(); //from here only we toggle 
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    color={useColorModeValue("gray.800", "white")}
                    letterSpacing={"tighter"}
                >
                    <Link to={"/"}>Product Store 🏬</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button variant={"ghost"}>
                            <PlusSquareIcon fontSize={20}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode} variant={"ghost"}>
                        {colorMode === "light" ? <IoMoon/> : <LuSun />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
  )
}

export default Navbar