import {
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
  List,
  ListItem,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaCircle } from "react-icons/fa";

type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
  description: string[];
};

type ExperienceProps = {
  experiences: ExperienceItem[];
};

export const Experience: React.FC<ExperienceProps> = ({
  experiences,
}: ExperienceProps) => {
  return (
    <Box width="100%" py={8}>
      <Heading size="xl" mb={6} textAlign="left">
        Experience
      </Heading>
      <VStack
        spacing={6}
        align="start"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {experiences.map((experience: ExperienceItem, index: number) => (
          <Box key={index}>
            <Heading as="h3" size="md" mb={1}>
              {experience.title} @ {experience.company}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {experience.duration}
            </Text>
            <List spacing={3}>
              {experience.description.map((point: string, idx: number) => (
                <ListItem key={idx} display="flex" alignItems="center">
                  <Icon as={FaCircle} w={2} h={2} color="cyan.500" mr={2} />
                  {point}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
