import { HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Link = ({ children, to, ...props }) => (
  <NavLink to={to} {...props}>
    {({ isActive }) => (
      <Text
        fontSize="lg"
        color={isActive ? "blue.200" : "grey.200"}
        fontWeight={isActive ? "semibold" : "regular"}
      >
        {children}
      </Text>
    )}
  </NavLink>
);

export default function NavBar() {
  return (
    <HStack borderBottom="1px" borderColor="grey.200" h="56px" px="3">
      <Text fontSize="xl" as="b" mr="3">
        <NavLink to="/">umdb</NavLink>
      </Text>
      <HStack>
        <Link to="/persons">Persons</Link>
      </HStack>
    </HStack>
  );
}
