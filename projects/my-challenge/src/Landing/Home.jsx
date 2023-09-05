import { Box, Text } from "@chakra-ui/react";
import GetList from "../components/getList";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <Text fontSize={"72px"} ml={"60px"}>
            Blog List
          </Text>
          <GetList />
        </div>
      </main>
    </>
  );
}
