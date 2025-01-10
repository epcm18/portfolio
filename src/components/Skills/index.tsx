import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SkillItem } from "../SkillItem";
import { Skill } from "../../types/skill";

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
};

type SkillsProps = {
  skills: Skill[];
};

export const Skills: React.FC<SkillsProps> = ({
  skills,
}: SkillsProps): JSX.Element => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch Medium RSS feed and parse it
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@epcm18"
    )
      .then((response: Response) => response.json())
      .then(
        (data: {
          items: Array<{ title: string; link: string; pubDate: string }>;
        }) => {
          const posts: BlogPost[] = data.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString(),
          }));
          setBlogPosts(posts.slice(0, 3)); // Get the latest 3 blog posts
          setLoading(false);
        }
      )
      .catch((error: Error) => {
        // Replace console statement with better error handling
        setBlogPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Heading size={"xl"} textAlign={"left"}>
        Skills & Blogs
      </Heading>
      <Stack
        mt={5}
        spacing={10}
        direction={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
      >
        <Box>
          <Text>
            Technology I&apos;ve worked &{" "}
            <Text as="span" color="gray.500">
              dabbled
            </Text>{" "}
            with:
          </Text>
          <SimpleGrid
            columns={{ base: 2, sm: 4 }}
            spacing="6"
            p="5"
            pl={{ base: 5, sm: 0 }}
            textAlign="center"
            alignSelf={"start"}
          >
            {skills.map(
              (skill: Skill, index: number): JSX.Element => (
                <SkillItem
                  key={index}
                  name={skill.name}
                  Icon={skill.Icon}
                  dabbled={skill.dabbled}
                />
              )
            )}
          </SimpleGrid>
        </Box>
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          animate={{ transition: { type: "spring", duration: 0.1 } }}
        >
          <Text>Latest Medium Blog Posts</Text>
          <Box
            mt={{ base: 0, sm: 16 }}
            pt={0}
            width={{ base: "350px", sm: "300px", md: "400px", lg: "500px" }}
          >
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <Stack spacing={8}>
                {blogPosts.map(
                  (post: BlogPost, index: number): JSX.Element => (
                    <Box key={index}>
                      <Link
                        href={post.link}
                        isExternal
                        fontWeight="bold"
                        fontSize="xl"
                        color="blue.500"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {post.title}
                      </Link>
                      <Text fontSize="sm" color="gray.500" mt={1}>
                        {post.pubDate}
                      </Text>
                      <Divider mt={4} />
                    </Box>
                  )
                )}
              </Stack>
            )}
          </Box>
        </motion.div>
      </Stack>
    </>
  );
};
