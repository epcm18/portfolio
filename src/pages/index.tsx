import { Text, Box, Container, useMediaQuery, Link } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { LandingPage } from "../components/LandingPage";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import { About } from "../components/about";
import { Projects } from "../components/Projects";
import { dailyTasks, experiences } from "../../data/experiences";
import bio from "../../data/bio.json";
import links from "../../data/links.json";
import { skills } from "../../data/skills";
import { Experience } from "../components/Experience";
import { experienceData } from "../../data/workExperience";

const Index: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 480px)", { ssr: false });

  return (
    <>
      <NavBar {...links}></NavBar>
      <Container as="main" maxW="100%" p={0} centerContent>
        <Box width="100%" mt={16}>
          <LandingPage {...bio} isMobile={isMobile} />
        </Box>

        <Container maxW="6xl" centerContent>
          <Box id="about" mt={16}>
            <About content={bio.about} />
          </Box>
          <Box id="experience" width={"100%"} mt={16}>
            <Experience experiences={experienceData} />
          </Box>
          <Box id="projects" mt={16}>
            <Projects
              experiences={experiences}
              dailyTasks={dailyTasks}
            ></Projects>
          </Box>
          <Box id="skills" width={"100%"} mt={16}>
            <Skills skills={skills} />
          </Box>
          <Box id="contact" width={"100%"} mt={38} mb={16}>
            <Contact socials={bio.socials} />
          </Box>
          <Footer mt={16}>
            <Text fontSize={"sm"}>
              Made with ❤️+ꜱᴋ14 by{" "}
              <Link href={"https://github.com/epcm18"} isExternal>
                epcm18
              </Link>
            </Text>
          </Footer>
        </Container>
      </Container>
    </>
  );
};

export default Index;
