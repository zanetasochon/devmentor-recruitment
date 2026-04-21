import {
  Accordion,
  Anchor,
  AppShell,
  Box,
  Button,
  Card,
  Code,
  Container,
  Grid,
  Group,
  Image,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmBanner } from "../components/ConfirmBanner";
import { RecruitmentForm } from "../components/RecruitmentForm";
import { StickyFooter } from "../components/StickyFooter";
import {
  primaryHeroButtonStyles,
  secondaryHeroButtonStyles,
} from "../lib/ctaButtonStyles";
import { publicAsset } from "../lib/publicAsset";

const headerLinkStyle = {
  fontSize: "16px",
  fontWeight: 500,
  color: "#0F172A",
  textDecoration: "none",
};

const socialIconLinkStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    border: "1px solid #E0A800",
    background: "#E0A800",
    transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "0 20px 40px rgba(0,0,0,.2) !important",
      filter: "saturate(1.05) !important",
      background: "#C99600",
      borderColor: "#C99600",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: "0 6px 14px rgba(0,0,0,.12) !important",
    },
  },
};

type WhyExpert = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  imageMaxWidth: number;
  imageRightOnDesktop: boolean;
  paragraphs: string[];
  bullets: string[];
};

const VIDEOPOINT_DISCOUNT_CODE = "PKwIT15";

const whyExperts: WhyExpert[] = [
  {
    name: "Mateusz Bogolubow",
    imageSrc: publicAsset("assets/photo-mateusz-bogolubow.png"),
    imageAlt: "Mateusz Bogolubow",
    secondaryImageSrc: publicAsset("assets/photo-mateusz-bogolubow-secondary.png"),
    secondaryImageAlt: "Mateusz Bogolubow podczas nagrania",
    imageMaxWidth: 460,
    imageRightOnDesktop: true,
    paragraphs: [
      "Od ponad dekady łączę praktyczne wytwarzanie oprogramowania z edukacją programistów. Zrealizowałem blisko 100 projektów komercyjnych, przeszkoliłem setki osób i konsekwentnie rozwijam standardy jakości w produktach cyfrowych.",
      "W DevMentor skupiam się na podejściu, które daje efekt biznesowy tzn. klarowne priorytety, szybkie decyzje wdrożeniowe i rozwiązania, które są trwałe technicznie, a jednocześnie zrozumiałe dla zespołu.",
    ],
    bullets: [
      "Ponad 10 lat doświadczenia w biznesie software i realizacji projektów komercyjnych.",
      "Ponad 400 osób nauczonych programowania i skutecznie przygotowanych do pracy w IT.",
      "Wyróżnienie Mentor Roku oraz wieloletnia praktyka prowadzenia szkoleń i mentoringu.",
      "Silne zaplecze frontend/fullstack i nacisk na jakość wdrożeń oraz architekturę rozwiązań.",
      "Pragmatyczne podejście zawierające się w rekomendacji gotowych działań, a nie tylko w teorii.",
    ],
  },
];

export function RecruitmentLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const partnerDiscountClipboard = useClipboard({ timeout: 2500 });

  const scrollToSection =
    (sectionId: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const section = document.getElementById(sectionId);
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppShell header={{ height: 124 }} footer={{ height: 72 }} padding={0} withBorder={false}>
      <Anchor
        href="#main-content"
        className="skip-link"
        underline="never"
        aria-label="Pomiń do treści"
      >
        Pomiń do treści
      </Anchor>

      <AppShell.Header style={{ background: "transparent", borderBottom: "none" }}>
        <Box h="100%" py={0} px={isScrolled ? 0 : "md"}>
          <Paper
            h={isScrolled ? 80 : 88}
            mt={isScrolled ? 0 : "md"}
            radius={isScrolled ? 0 : 25}
            px="lg"
            withBorder={false}
            style={{
              width: "100%",
              maxWidth: isScrolled ? "100%" : "1341px",
              marginInline: "auto",
              background: isScrolled ? "#FFFFFF" : "rgba(33, 33, 33, 0.042)",
              boxShadow: isScrolled
                ? "0 2px 6px rgba(0, 0, 0, 0.06)"
                : "0 4px 4px rgba(0, 0, 0, 0.25)",
              transition:
                "height 240ms ease, margin-top 240ms ease, border-radius 240ms ease, background-color 240ms ease, box-shadow 240ms ease, max-width 240ms ease",
            }}
          >
            <Group h="100%" justify="space-between" wrap="nowrap">
              <Anchor component={Link} to="/" underline="never" aria-label="DevMentor home">
                <Image src={publicAsset("assets/logo-devmentor.png")} alt="devmentor.pl" h={56} w="auto" />
              </Anchor>

              <Group gap="lg" visibleFrom="md">
                <Anchor
                  href="#mechanics-title"
                  onClick={scrollToSection("mechanics-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Jak wziąć udział
                </Anchor>
                <Anchor
                  href="#partner-title"
                  onClick={scrollToSection("partner-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Partner
                </Anchor>
                <Anchor
                  href="#offer-title"
                  onClick={scrollToSection("offer-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Co otrzymasz
                </Anchor>
                <Anchor
                  href="#why-title"
                  onClick={scrollToSection("why-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Twój rekruter Mateusz
                </Anchor>
                <Anchor
                  href="#faq-title"
                  onClick={scrollToSection("faq-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  FAQ
                </Anchor>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <Anchor
                  href="https://www.linkedin.com/in/mateusz-bogolubow/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  styles={socialIconLinkStyles}
                  className="header-social-link"
                >
                  <Image src={publicAsset("assets/logo-linkedin.png")} alt="" aria-hidden="true" w={18} h={18} />
                </Anchor>
                <Anchor
                  href="https://www.youtube.com/channel/UCXasVW0-mZLLoufw_uH9okA"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  styles={socialIconLinkStyles}
                  className="header-social-link"
                >
                  <Image src={publicAsset("assets/logo-youtube.png")} alt="" aria-hidden="true" w={18} h={18} />
                </Anchor>
              </Group>
            </Group>
          </Paper>
        </Box>
      </AppShell.Header>

      <AppShell.Main
        component="main"
        id="main-content"
        className="landing-main"
        style={{ position: "relative", paddingBottom: "calc(72px + 2rem)" }}
      >
        <Box
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "min(42vw, 520px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image src={publicAsset("assets/decore-hero.png")} alt="" w="100%" h="auto" />
        </Box>

        <Container size="lg" py={56} style={{ position: "relative", zIndex: 1 }}>
          <Stack gap={80}>
            <ConfirmBanner />
            <Box component="section" aria-labelledby="hero-title">
              <Grid align="center" gutter={{ base: 80, md: "xl" }}>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack gap="sm" pos="relative" className="hero-copy">
                    <Text
                      size="sm"
                      fw={700}
                      tt="uppercase"
                      c="blue.7"
                      style={{ letterSpacing: "0.12em", zIndex: 1, position: "relative" }}
                    >
                      Rekrutacja IT
                    </Text>
                    <Title id="hero-title" order={1}>
                      Darmowa próbna{` `}
                      <Box
                        component="span"
                        style={{
                          position: "relative",
                          display: "inline-flex",
                        }}
                      >
                        rekrutacja
                        <Box
                          component="span"
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: "-18px",
                            width: "140%",
                            height: "30px",
                            backgroundImage: `url('${publicAsset("assets/decore-yellow.png")}')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            zIndex: -1,
                          }}
                        />
                      </Box>{" "}
                      IT (0 zł)
                    </Title>
                    <Text size="lg">
                      Weź udział w profesjonalnej symulacji rozmowy rekrutacyjnej i sprawdź swój
                      poziom — całkowicie za darmo
                    </Text>
                    <Text c="dimmed">
                      Dla jednej wybranej osoby, która wpisze poprawny kod z podcastu
                    </Text>
                    <Box visibleFrom="md">
                      <Image
                        src={publicAsset("assets/photo-mateusz-bogolubow-secondary.png")}
                        alt="Mateusz Bogolubow podczas nagrania"
                        radius="lg"
                        mt="md"
                        maw={420}
                        w="100%"
                        mx={0}
                        fit="contain"
                        style={{
                          backgroundColor: "#ffffff",
                        }}
                      />
                    </Box>
                    <Group mt="sm" className="hero-cta-group">
                      <Button
                        component="a"
                        href="#why-title"
                        onClick={scrollToSection("why-title")}
                        styles={primaryHeroButtonStyles}
                        className="hero-btn-primary hero-cta-button"
                      >
                        Twój rekruter Mateusz
                      </Button>
                      <Button
                        component="a"
                        href="#offer-title"
                        onClick={scrollToSection("offer-title")}
                        styles={secondaryHeroButtonStyles}
                        className="hero-btn-secondary hero-cta-button"
                        rightSection={
                          <Image
                            src={publicAsset("assets/icon-arrow-right.png")}
                            alt=""
                            aria-hidden="true"
                            w={16}
                            h={16}
                          />
                        }
                      >
                        Co otrzymasz
                      </Button>
                    </Group>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Paper p="lg" withBorder pos="relative" style={{ zIndex: 1 }} className="hero-form-card">
                    <RecruitmentForm />
                  </Paper>
                </Grid.Col>
              </Grid>
            </Box>

            <Box component="section" aria-labelledby="partner-title">
              <Grid gutter={{ base: "md", md: "xl" }} align="center" justify="center">
                <Grid.Col span={{ base: 12, md: 7 }} className="why-content partner-mobile-center">
                  <Box className="partner-section-header">
                    <Stack gap="md" maw={640} mx="auto">
                      <Text
                        size="sm"
                        fw={700}
                        tt="uppercase"
                        c="blue.7"
                        ta="left"
                        className="why-eyebrow"
                        style={{ letterSpacing: "0.12em" }}
                      >
                        Partner
                      </Text>
                      <Title id="partner-title" order={2} ta="left" className="why-heading">
                        Videopoint
                      </Title>
                      <Text size="md" ta="left">
                        <strong>Videopoint</strong> to marka Grupy Helion z szerokim katalogiem kursów i szkoleń online
                        (m.in. IT, biznes, programowanie, dane, cyberbezpieczeństwo). Na{" "}
                        <Anchor href="https://videopoint.pl" target="_blank" rel="noopener noreferrer" fw={600}>
                          videopoint.pl
                        </Anchor>{" "}
                        kupujesz pojedyncze produkty i korzystasz z kodów oraz bonów przy zamówieniu.
                      </Text>
                      <Text size="md" ta="left">
                        <strong>Videopoint dla firm</strong> to platforma rozwoju kompetencji dla zespołów: tokeny,
                        ścieżki rozwoju pod profil, przypisania, role lidera i uczestnika, materiały od praktyków — to
                        osobna ścieżka od zakupów w sklepie. Próbną rekrutację DevMentor realizujemy z Videopoint
                        (podcast i przygotowanie do rozmów).{" "}
                        <Anchor
                          href="https://videopoint.pl/oferta_dla_firm.shtml"
                          target="_blank"
                          rel="noopener noreferrer"
                          fw={600}
                        >
                          Videopoint dla firm
                        </Anchor>
                        {" · "}
                        <Anchor href="https://videopoint.pl" target="_blank" rel="noopener noreferrer" fw={600}>
                          videopoint.pl
                        </Anchor>
                      </Text>
                    </Stack>
                  </Box>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 5 }} style={{ overflow: "visible" }}>
                  <Stack gap={0} align="center" style={{ overflow: "visible" }}>
                    <Anchor
                      href="https://videopoint.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="never"
                      display="block"
                      style={{
                        width: "fit-content",
                        maxWidth: "100%",
                        marginInline: "auto",
                        lineHeight: 0,
                      }}
                    >
                      <Image
                        src={publicAsset("assets/videopoint-logo.png")}
                        alt="videopoint — logo"
                        radius="sm"
                        h={{ base: 156, sm: 192 }}
                        w="auto"
                        maw="100%"
                        fit="contain"
                        display="block"
                        style={{ verticalAlign: "top" }}
                        styles={{
                          root: {
                            paddingBlock: 0,
                            lineHeight: 0,
                            width: "fit-content",
                            maxWidth: "100%",
                          },
                        }}
                      />
                    </Anchor>

                    <Box className="partner-rabat-card">
                      <Paper
                        component="aside"
                        className="partner-rabat-paper"
                        aria-labelledby="partner-discount-heading"
                        withBorder
                        p={{ base: "md", sm: "lg" }}
                        radius="md"
                        w="100%"
                      >
                        <Stack gap="sm" ta="center">
                          <Text id="partner-discount-heading" size="sm" fw={600}>
                            Rabat na start
                          </Text>
                          <Text size="sm">
                            <strong>Bon −15%</strong> działa przy <strong>zakupach na videopoint.pl</strong> — wklej kod
                            przy zamówieniu.
                          </Text>
                          <Group gap="sm" justify="center" wrap="wrap">
                            <Code
                              fz="md"
                              fw={700}
                              px="sm"
                              py="xs"
                              style={{ userSelect: "all", cursor: "text" }}
                            >
                              {VIDEOPOINT_DISCOUNT_CODE}
                            </Code>
                            <Button
                              type="button"
                              variant="light"
                              color="teal"
                              size="xs"
                              onClick={() => partnerDiscountClipboard.copy(VIDEOPOINT_DISCOUNT_CODE)}
                            >
                              {partnerDiscountClipboard.copied ? "Skopiowano!" : "Kopiuj kod"}
                            </Button>
                          </Group>
                        </Stack>
                      </Paper>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>

            <Box component="section" aria-labelledby="mechanics-title">
              <Stack
                gap="md"
                p="lg"
                className="scope-section"
                style={{
                  borderRadius: "var(--mantine-radius-lg)",
                  backgroundColor: "rgba(10, 112, 255, 0.12)",
                }}
              >
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="scope-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Rekrutacja IT
                </Text>
                <Title id="mechanics-title" order={2} className="scope-heading">
                  Aby wziąć udział
                </Title>
                <List
                  spacing="sm"
                  icon={<IconCheck size={18} aria-hidden="true" />}
                  withPadding
                >
                  <List.Item>Wypełnij powyższy formularz</List.Item>
                  <List.Item>
                    wpisz kod z podcastu (w odcinku podany jest np. kod{" "}
                    <Text span fw={600}>
                      0021
                    </Text>
                    )
                  </List.Item>
                  <List.Item>kod jest ważny 7 dni od premiery tego odcinka</List.Item>
                </List>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="offer-title">
              <Stack gap="md">
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="result-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Oferta
                </Text>
                <Title id="offer-title" order={2} className="result-heading">
                  3 spotkania po 45 minut + code review
                </Title>
                <Text c="dimmed" size="sm" maw={800}>
                  Comiesięczna akcja we współpracy z VideoPoint z grupy Helion: pełna próbna rekrutacja
                  o wartości 1490 zł — dla jednej wybranej osoby z kodem z podcastu za 0 zł.
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Przygotowanie
                        </Title>
                        <List spacing="xs" size="sm" icon={<IconCheck size={16} aria-hidden="true" />}>
                          <List.Item>omówienie dotychczasowych działań</List.Item>
                          <List.Item>usprawnienie obecnego CV</List.Item>
                          <List.Item>przedyskutowanie tematów miękkich (HR-owych)</List.Item>
                        </List>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Praktyka
                        </Title>
                        <List spacing="xs" size="sm" icon={<IconCheck size={16} aria-hidden="true" />}>
                          <List.Item>przygotowanie zadania + live coding</List.Item>
                          <List.Item>code review rozwiązania</List.Item>
                          <List.Item>pytania teoretyczne</List.Item>
                        </List>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Podsumowanie
                        </Title>
                        <List spacing="xs" size="sm" icon={<IconCheck size={16} aria-hidden="true" />}>
                          <List.Item>podsumowanie wyników</List.Item>
                        </List>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="why-title">
              <Stack gap="md">
                <Stack gap="md" pb="xl">
                  <Text
                    size="sm"
                    fw={700}
                    tt="uppercase"
                    c="blue.7"
                    ta="center"
                    className="why-eyebrow"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    Rekrutacja IT
                  </Text>
                  <Title id="why-title" order={2} ta="center" className="why-heading">
                    Rekrutacja
                  </Title>
                </Stack>

                <Stack gap={96}>
                  {whyExperts.map((expert) => (
                    <Grid key={expert.name} gutter={{ base: 80, md: "xl" }} align="center" justify="center">
                    {expert.imageRightOnDesktop ? (
                      <>
                        <Grid.Col span={{ base: 12, md: 7 }} className="why-content">
                          <Stack gap="md" maw={640} mx="auto">
                            <Title order={3}>{expert.name}</Title>
                            {expert.paragraphs.map((paragraph) => (
                              <Text key={paragraph}>{paragraph}</Text>
                            ))}
                            <List
                              spacing="md"
                              icon={<IconChevronRight size={18} aria-hidden="true" />}
                              withPadding
                              className="chevron-list"
                            >
                              {expert.bullets.map((bullet) => (
                                <List.Item key={bullet}>{bullet}</List.Item>
                              ))}
                            </List>
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 5 }}>
                          <Stack gap="md" align="center">
                            <Image
                              src={expert.imageSrc}
                              alt={expert.imageAlt}
                              radius="lg"
                              w={expert.imageMaxWidth}
                              maw="100%"
                              fit="contain"
                              style={{
                                marginInline: "auto",
                                backgroundColor: "#ffffff",
                              }}
                            />
                            {expert.secondaryImageSrc && (
                              <Image
                                src={expert.secondaryImageSrc}
                                alt={expert.secondaryImageAlt}
                                radius="lg"
                                w={expert.imageMaxWidth}
                                maw="100%"
                                fit="contain"
                                style={{
                                  marginInline: "auto",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            )}
                          </Stack>
                        </Grid.Col>
                      </>
                    ) : (
                      <>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                          <Stack gap="md" align="center">
                            <Image
                              src={expert.imageSrc}
                              alt={expert.imageAlt}
                              radius="lg"
                              w={expert.imageMaxWidth}
                              maw="100%"
                              fit="contain"
                              style={{
                                marginInline: "auto",
                                backgroundColor: "#ffffff",
                              }}
                            />
                            {expert.secondaryImageSrc && (
                              <Image
                                src={expert.secondaryImageSrc}
                                alt={expert.secondaryImageAlt}
                                radius="lg"
                                w={expert.imageMaxWidth}
                                maw="100%"
                                fit="contain"
                                style={{
                                  marginInline: "auto",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            )}
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 7 }} className="why-content">
                          <Stack gap="md" maw={640} mx="auto">
                            <Title order={3}>{expert.name}</Title>
                            {expert.paragraphs.map((paragraph) => (
                              <Text key={paragraph}>{paragraph}</Text>
                            ))}
                            <List
                              spacing="md"
                              icon={<IconChevronRight size={18} aria-hidden="true" />}
                              withPadding
                              className="chevron-list"
                            >
                              {expert.bullets.map((bullet) => (
                                <List.Item key={bullet}>{bullet}</List.Item>
                              ))}
                            </List>
                          </Stack>
                        </Grid.Col>
                      </>
                    )}
                    </Grid>
                  ))}
                </Stack>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="faq-title" className="faq-section">
              <Stack gap="md">
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="faq-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Rekrutacja IT
                </Text>
                <Title id="faq-title" order={2} className="faq-heading">
                  FAQ
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <Accordion variant="separated" radius="md">
                    <Accordion.Item value="kto">
                      <Accordion.Control>Kto może wziąć udział?</Accordion.Control>
                      <Accordion.Panel>
                        Każdy słuchacz może zgłosić się, wypełniając powyższy formularz i podając
                        aktualny kod z podcastu. Zgłoszenie jest bezpłatne; próbną rekrutację o
                        wartości 1490 zł przeprowadzamy dla jednej wybranej osoby.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="kod">
                      <Accordion.Control>Jaki kod jest poprawny?</Accordion.Control>
                      <Accordion.Panel>
                        Kod podajemy w odcinku podcastu. Musi być wpisany dokładnie tak, jak w
                        instrukcji. Kod jest ważny przez 7 dni od premiery tego odcinka.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="czas">
                      <Accordion.Control>Ile trwa kontakt po zgłoszeniu?</Accordion.Control>
                      <Accordion.Panel>
                        Zwykle wracamy w 1-2 dni robocze z informacją o kolejnych krokach.
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion variant="separated" radius="md">
                    <Accordion.Item value="zakres">
                      <Accordion.Control>Co obejmuje próbna rekrutacja?</Accordion.Control>
                      <Accordion.Panel>
                        3 spotkania po 45 minut oraz code review, zgodnie z opisem sekcji oferty na
                        stronie.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="rodo">
                      <Accordion.Control>Jak przetwarzacie dane osobowe?</Accordion.Control>
                      <Accordion.Panel>
                        Zbieramy dane z formularza zgłoszeniowego. Szczegóły znajdziesz w polityce
                        prywatności.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="usuniecie">
                      <Accordion.Control>Jak mogę usunąć swoje dane?</Accordion.Control>
                      <Accordion.Panel>
                        Napisz do nas z adresu użytego w formularzu. Usuniemy dane zgodnie z
                        obowiązującymi przepisami.
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </SimpleGrid>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </AppShell.Main>

      <StickyFooter />
    </AppShell>
  );
}
