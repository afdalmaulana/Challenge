import { Box, Flex, Text } from "@chakra-ui/react";
import { Card, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GetList() {
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function viewBlog(item) {
    navigate(`/viewarticle?title=${item.title}`);
  }

  const list = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=bf4d599a0754445f99d3a15bf3f92a19&pageSize=8&page=${pageNum}`
      );
      const newBlog =
        pageNum === 1
          ? response.data.articles
          : [...blog, ...response.data.articles];
      console.log(response.articles?.source);
      console.log(response.data.articles);
      setBlog(newBlog);
      setPage(pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    list(nextPage);
  };

  return (
    <>
      <Box w={"100%"}>
        <Flex wrap={"wrap"} gap={10} ml={"55px"} mt={"20px"}>
          {blog.map((item) => {
            return (
              <Card
                key={item.source.id}
                style={{
                  maxWidth: 300,
                  minWidth: 300,
                  maxHeight: 500,
                  minHeight: 500,
                }}
                cover={
                  <img
                    alt="API Picture"
                    src={item.urlToImage}
                    style={{ width: 300, height: 200 }}
                  />
                }
              >
                <Text noOfLines={2} fontWeight={"bold"}>
                  {item.title}
                </Text>
                <Text>Author : {item.author}</Text>
                <Text>{new Date(item.publishedAt).toLocaleDateString()}</Text>
                <Text>Source : {item.source.name}</Text>
                <Divider />
                <Text>Description : </Text>
                <Text noOfLines={2}>{item.description}</Text>
                <Button onClick={() => viewBlog(item)}>Read More</Button>
              </Card>
            );
          })}
        </Flex>
        {isLoading ? (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 50,
              width: "fit-content",
            }}
          >
            <Text>Please wait ...</Text>
          </div>
        ) : (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              width: "fit-content",
            }}
          >
            <Button
              type="link"
              style={{ color: "black" }}
              size="large"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </Box>
    </>
  );
}
