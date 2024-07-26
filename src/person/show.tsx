import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import * as api from "./api";

const PersonMenu = ({ person }) => {
  const name: any = person.name;

  const navigate = useNavigate();

  const delete_ = async () => {
    if (window.confirm("Delete?")) {
      try {
        await api.delete_(person.id);
        navigate("/persons");
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<i className="fa-solid fa-chevron-down" />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to={`name/${name.id}/edit`}>
          Rename
        </MenuItem>
        <MenuItem onClick={delete_}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

const PersonCard = ({ person }) => (
  <Card maxW="lg">
    <CardHeader>
      <Flex>
        <Heading size="md">Information</Heading>
        <Spacer />
        <Link to="edit" className="fs-8 align-middle">
          <i className="fa-solid fa-pencil pe-1" /> Edit
        </Link>
      </Flex>
    </CardHeader>
    <CardBody>
      <pre className="mb-0">{JSON.stringify(person, null, 2)}</pre>
    </CardBody>
  </Card>
);

export default function PersonShowPage() {
  const person: any = useLoaderData();
  const name: any = person.name;
  return (
    <VStack align="stretch">
      <Flex>
        <Heading size="lg">{name?.full}</Heading>
        <Spacer />
        <PersonMenu person={person} />
      </Flex>
      <PersonCard person={person} />
    </VStack>
  );
}
