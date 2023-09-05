import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export default function ViewArticle() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idBlogView = searchParams.get("id");
  const titleView = searchParams.get("title");
  const [viewArticle, setViewArticle] = useState({});
  const urlId = window.location.href.split("/");
  const navigate = useNavigate();
  const viewBlog = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${titleView}&apiKey=bf4d599a0754445f99d3a15bf3f92a19`
      );

      if (response.data.articles && response.data.articles.length > 0) {
        setViewArticle(response.data.articles[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewBlog();
  }, []);

  function toHome() {
    navigate("/");
  }
  return (
    <Box ml={"100px"} mt={"100px"}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => toHome()}>
        Back to home
      </Button>
      <Card w={"1200px"} shadow={"dark-lg"} overflowY={"scroll"}>
        <Flex>
          <CardHeader>
            <Image
              height={"300px"}
              width={"500px"}
              objectFit="cover"
              src={viewArticle.urlToImage} // Menampilkan gambar dari API
              alt="API Picture"
            />
          </CardHeader>
          <CardBody>
            <Text fontSize={"2xl"} fontWeight={"bold"} fontFamily={"mono"}>
              {viewArticle.title} {/* Menampilkan judul */}
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Author: {viewArticle.author}
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Published:{" "}
              {new Date(viewArticle.publishedAt).toLocaleDateString()}
            </Text>
            <Box overflow={"scroll"}>
              <Text fontSize={"20px"}>{viewArticle.description}</Text>
            </Box>
            <Box bgColor={"black"}>
              <Divider />
            </Box>
            <Box overflow={"scroll"}>
              <Text fontSize={"20px"}>{viewArticle.content}</Text>
            </Box>
          </CardBody>
        </Flex>
      </Card>
    </Box>
  );
}
