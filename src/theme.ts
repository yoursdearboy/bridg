import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";

const cardHelpers = createMultiStyleConfigHelpers(cardAnatomy.keys);

const Card = cardHelpers.defineMultiStyleConfig({
  baseStyle: cardHelpers.definePartsStyle({
    container: {},
    header: {
      paddingBottom: "10px",
    },
    body: {
      paddingTop: "10px",
    },
    footer: {},
  }),
});

export default extendTheme({
  components: {
    Card,
  },
});
