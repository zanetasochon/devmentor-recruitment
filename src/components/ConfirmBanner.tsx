import { Alert, Box, Loader, Stack, Text } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const CONFIRM_ENDPOINT = (
  import.meta.env.VITE_RECRUITMENT_CONFIRM_WEBHOOK_URL as string | undefined
)?.trim();

type ConfirmStatus = "idle" | "loading" | "success" | "error";

export function ConfirmBanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmId = useMemo(() => {
    const routerParam = searchParams.get("confirm")?.trim();
    if (routerParam) return routerParam;

    const browserParam = new URLSearchParams(window.location.search).get("confirm")?.trim();
    if (browserParam) return browserParam;

    return "";
  }, [searchParams]);

  const [status, setStatus] = useState<ConfirmStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const requestUrl = useMemo(() => {
    if (!confirmId || !CONFIRM_ENDPOINT) return "";
    const url = new URL(CONFIRM_ENDPOINT);
    url.searchParams.set("id", confirmId);
    return url.toString();
  }, [confirmId]);

  useEffect(() => {
    if (!confirmId) {
      return;
    }

    if (!requestUrl) {
      setStatus("error");
      setMessage("Brakuje konfiguracji webhooka potwierdzenia.");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setMessage("");

    fetch(requestUrl, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "text/plain, application/json;q=0.9, */*;q=0.8" },
    })
      .then(async (response) => {
        const raw = await response.text();
        const text = raw.trim();
        if (!response.ok) {
          throw new Error(text || "Potwierdzenie nie powiodło się.");
        }
        setStatus("success");
        setMessage(text || "Zgłoszenie zostało potwierdzone. Dziękujemy!");
        const browserSearch = new URLSearchParams(window.location.search);
        browserSearch.delete("confirm");
        const nextSearch = browserSearch.toString();
        navigate(`${location.pathname}${location.hash}${nextSearch ? `?${nextSearch}` : ""}`, {
          replace: true,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
        setMessage(
          error instanceof Error && error.message
            ? error.message
            : "Nie udało się potwierdzić zgłoszenia. Spróbuj ponownie za chwilę lub napisz do nas.",
        );
      });

    return () => controller.abort();
  }, [confirmId, requestUrl, location.hash, location.pathname, navigate]);

  if (!confirmId && status === "idle") return null;

  return (
    <Box component="section" aria-labelledby="confirm-banner-title" role="status" aria-live="polite">
      {status === "loading" && (
        <Alert
          variant="light"
          color="blue"
          icon={<Loader size={16} />}
          id="confirm-banner-title"
          title="Potwierdzamy Twoje zgłoszenie…"
        >
          <Text size="sm">Łączymy się z systemem, to zajmie chwilę.</Text>
        </Alert>
      )}

      {status === "success" && (
        <Alert
          variant="light"
          color="green"
          icon={<IconCheck size={18} aria-hidden="true" />}
          id="confirm-banner-title"
          title="Zgłoszenie potwierdzone"
        >
          <Stack gap="xs">
            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Stack>
        </Alert>
      )}

      {status === "error" && (
        <Alert
          variant="light"
          color="red"
          icon={<IconAlertCircle size={18} aria-hidden="true" />}
          id="confirm-banner-title"
          title="Nie udało się potwierdzić zgłoszenia"
        >
          <Stack gap="xs">
            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Stack>
        </Alert>
      )}
    </Box>
  );
}
