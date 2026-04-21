import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Grid,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { primaryFilledSubmitButtonStyles } from "../lib/ctaButtonStyles";
import { DEFAULT_MAKE_LEADS_WEBHOOK } from "../lib/defaultMakeWebhookUrl";

const RECRUITMENT_WEBHOOK_URL =
  (import.meta.env.VITE_RECRUITMENT_WEBHOOK_URL as string | undefined)?.trim() ||
  DEFAULT_MAKE_LEADS_WEBHOOK;

type FormValues = {
  name: string;
  email: string;
  code: string;
  seniority: string;
  biggestProblem: string;
  jobChangeTiming: string;
  description: string;
  githubUrl: string;
  videoTestimonialConsent: boolean;
  website: string;
};

type EmailRule = {
  isValid: (email: string) => boolean;
  message: string;
};

const EMAIL_RULES: EmailRule[] = [
  {
    isValid: (email) => email.length > 0,
    message: "Podaj adres e-mail.",
  },
  {
    isValid: (email) => email.includes("@"),
    message: "Adres e-mail musi zawierać znak @.",
  },
  {
    isValid: (email) => email.split("@").length === 2,
    message: "Adres e-mail może zawierać tylko jeden znak @.",
  },
  {
    isValid: (email) => {
      const [localPart = ""] = email.split("@");
      return localPart.length > 0;
    },
    message: "Brakuje części przed znakiem @ (np. imie).",
  },
  {
    isValid: (email) => {
      const [, domainPart = ""] = email.split("@");
      return domainPart.length > 0;
    },
    message: "Brakuje domeny po znaku @ (np. firma.pl).",
  },
  {
    isValid: (email) => {
      const [, domainPart = ""] = email.split("@");
      return domainPart.includes(".");
    },
    message: "Domena e-mail musi zawierać kropkę (np. firma.pl).",
  },
  {
    isValid: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: "Wpisz poprawny adres e-mail, np. imie@firma.pl.",
  },
];

function validateEmailFormat(value: string): string | null {
  const email = value.trim();
  return EMAIL_RULES.find((rule) => !rule.isValid(email))?.message ?? null;
}

function normalizeOptionalUrl(value: string): string | null {
  const trimmed = value.trim().replace(/\s+/g, "");
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (!/^https?:$/i.test(url.protocol)) {
      return null;
    }
    if (!url.hostname) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

const SENIORITY_OPTIONS = [
  { value: "Entry level / Stażysta", label: "Entry level / Stażysta" },
  { value: "Junior", label: "Junior" },
  { value: "Mid / Regular", label: "Mid / Regular" },
  { value: "Senior / Lead", label: "Senior / Lead" },
];

const PROBLEM_OPTIONS = [
  {
    value:
      'Pytania miękkie (HR, behawioralne, tzw. "gdzie widzisz się za 5 lat")',
    label:
      'Pytania miękkie (HR, behawioralne, tzw. "gdzie widzisz się za 5 lat")',
  },
  {
    value: "Live coding / Zadania techniczne na żywo",
    label: "Live coding / Zadania techniczne na żywo",
  },
  {
    value: "Pytania z architektury / System Design",
    label: "Pytania z architektury / System Design",
  },
  {
    value: "Negocjacje widełek finansowych",
    label: "Negocjacje widełek finansowych",
  },
  {
    value: "Zbyt duży stres, który mnie paraliżuje",
    label: "Zbyt duży stres, który mnie paraliżuje",
  },
];

const TIMING_OPTIONS = [
  {
    value: "Szukam aktywnie już teraz (pilne!)",
    label: "Szukam aktywnie już teraz (pilne!)",
  },
  {
    value: "Rozglądam się, planuję zmianę w ciągu 3-6 miesięcy",
    label: "Rozglądam się, planuję zmianę w ciągu 3-6 miesięcy",
  },
  {
    value: 'Nie szukam aktywnie, ale chcę sprawdzić swoje siły "na sucho"',
    label: 'Nie szukam aktywnie, ale chcę sprawdzić swoje siły "na sucho"',
  },
];

export function RecruitmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formElementRef = useRef<HTMLFormElement | null>(null);
  const successAlertRef = useRef<HTMLDivElement | null>(null);
  const errorAlertRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      code: "",
      seniority: "",
      biggestProblem: "",
      jobChangeTiming: "",
      description: "",
      githubUrl: "",
      videoTestimonialConsent: false,
      website: "",
    },
    validate: {
      name: (value) => (value.trim() ? null : "Podaj imię."),
      email: (value) => validateEmailFormat(value),
      code: (value) => (value.trim() ? null : "Podaj kod z podcastu."),
      description: (value) =>
        value.trim() ? null : "Uzupełnij pole — jest wymagane do zgłoszenia.",
      githubUrl: (value) => {
        if (!value.trim()) {
          return null;
        }
        return normalizeOptionalUrl(value) ? null : "Wpisz poprawny adres URL profilu GitHub.";
      },
    },
  });

  const focusFirstInvalidControl = (): void => {
    requestAnimationFrame(() => {
      const invalid = formElementRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']",
      );
      invalid?.focus();
    });
  };

  const onSubmit = form.onSubmit(
    async (values) => {
      setSubmitError("");
      trackEvent("submit_attempt", { form_version: "recruitment_v1", page_variant: "recruitment" });

      const trimmedCode = values.code.trim();

      if (values.website.trim()) {
        setIsSuccess(true);
        return;
      }

      const normalizedGithub = values.githubUrl.trim()
        ? normalizeOptionalUrl(values.githubUrl)
        : null;

      if (values.githubUrl.trim() && !normalizedGithub) {
        form.setFieldError("githubUrl", "Wpisz poprawny adres URL profilu GitHub.");
        focusFirstInvalidControl();
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch(RECRUITMENT_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            code: trimmedCode,
            seniority: values.seniority || null,
            biggestProblem: values.biggestProblem || null,
            jobChangeTiming: values.jobChangeTiming || null,
            description: values.description.trim(),
            githubUrl: normalizedGithub,
            videoTestimonialConsent: values.videoTestimonialConsent,
          }),
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }

        trackEvent("submit_success", {
          form_version: "recruitment_v1",
          page_variant: "recruitment",
        });
        setIsSuccess(true);
        form.reset();
      } catch {
        trackEvent("submit_fail", {
          form_version: "recruitment_v1",
          page_variant: "recruitment",
          error_type: "network_or_endpoint",
        });
        setSubmitError("Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.");
      } finally {
        setIsSubmitting(false);
      }
    },
    () => {
      const errorFields = Object.keys(form.errors);
      if (errorFields.length === 0) {
        trackEvent("validation_error", {
          form_version: "recruitment_v1",
          page_variant: "recruitment",
          field_name: "unknown",
          error_type: "client_validation",
        });
      } else {
        errorFields.forEach((fieldName) => {
          trackEvent("validation_error", {
            form_version: "recruitment_v1",
            page_variant: "recruitment",
            field_name: fieldName,
            error_type: "client_validation",
          });
        });
      }
      focusFirstInvalidControl();
    },
  );

  useEffect(() => {
    if (isSuccess) {
      successAlertRef.current?.focus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (submitError) {
      errorAlertRef.current?.focus();
    }
  }, [submitError]);

  if (isSuccess) {
    return (
      <Box
        ref={successAlertRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Alert
          variant="light"
          color="green"
          title="Dziękujemy! Zgłoszenie zostało wysłane."
          icon={<IconCheck size={18} aria-hidden="true" />}
        >
          <Stack gap="sm">
            <Text size="sm">
              Dzięki! Zgłoszenie dotarło. Wrócimy do Ciebie z informacją o kolejnych krokach tak
              szybko, jak to możliwe.
            </Text>

            <Text size="sm" fw={700}>
              Aby dokończyć zgłoszenie:
            </Text>
            <Box component="ol" m={0} pl="lg" style={{ display: "grid", gap: 6 }}>
              <Text component="li" size="sm">
                Sprawdź swoją skrzynkę e-mail.
              </Text>
              <Text component="li" size="sm">
                Zajrzyj także do folderów <strong>Spam</strong> i{" "}
                <strong>Newsletter/Oferty</strong> — wiadomość może tam trafić.
              </Text>
              <Text component="li" size="sm">
                Kliknij <strong>link potwierdzający</strong> w wiadomości od nas.
              </Text>
            </Box>
          </Stack>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      ref={formElementRef}
      onSubmit={onSubmit}
      aria-busy={isSubmitting}
      noValidate
    >
      <Stack gap="md">
        <Grid gutter={{ base: "md", md: "md" }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Imię"
              placeholder="Jan"
              autoComplete="given-name"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Adres e-mail"
              placeholder="imie@example.com"
              type="email"
              autoComplete="email"
              {...form.getInputProps("email")}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={{ base: "md", md: "md" }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              withAsterisk
              label="Kod"
              placeholder="0021"
              autoComplete="one-time-code"
              {...form.getInputProps("code")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Twój poziom (seniority)"
              placeholder="Wybierz z listy"
              clearable
              data={SENIORITY_OPTIONS}
              {...form.getInputProps("seniority")}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter={{ base: "md", md: "md" }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Twój największy problem rekrutacyjny"
              placeholder="Wybierz z listy"
              clearable
              data={PROBLEM_OPTIONS}
              {...form.getInputProps("biggestProblem")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Kiedy realnie planujesz zmianę pracy?"
              placeholder="Wybierz z listy"
              clearable
              data={TIMING_OPTIONS}
              {...form.getInputProps("jobChangeTiming")}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          withAsterisk
          label='Dlaczego to właśnie z Tobą mam przeprowadzić darmową próbną rekrutację? (Opisz swój przypadek w 2-3 zdaniach)'
          placeholder="Np. czego szukasz i czemu chcesz skorzystać z próbnej rozmowy…"
          minRows={4}
          autosize
          {...form.getInputProps("description")}
        />

        <TextInput
          label="Podaj adres URL do GitHub-a (opcjonalnie)"
          placeholder="https://github.com/nazwa-uzytkownika"
          type="url"
          autoComplete="url"
          {...form.getInputProps("githubUrl")}
        />

        <Checkbox
          label="Chętnie nagram krótką video-opinie na temat całego procesu."
          {...form.getInputProps("videoTestimonialConsent", { type: "checkbox" })}
        />

        <Box component="div" className="visually-hidden">
          <TextInput
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            label="Nie wypełniaj tego pola"
            {...form.getInputProps("website")}
          />
        </Box>

        <Button
          type="submit"
          loading={isSubmitting}
          fullWidth
          styles={primaryFilledSubmitButtonStyles}
        >
          Wyślij zgłoszenie
        </Button>

        <Text size="sm" c="dimmed">
          Wysyłając formularz akceptujesz zasady przetwarzania danych opisane w{" "}
          <Anchor component={Link} to="/privacy">
            Polityce prywatności
          </Anchor>
          .
        </Text>

        {submitError && (
          <Box
            ref={errorAlertRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <Alert
              color="red"
              variant="light"
              icon={<IconAlertCircle size={18} aria-hidden="true" />}
              title="Wystąpił błąd"
            >
              {submitError}
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
