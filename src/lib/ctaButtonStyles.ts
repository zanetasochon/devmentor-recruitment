/**
 * CTA buttons: spoczynek z lekkim cieniem (e6), na hover — obramowanie w kolorze
 * przycisku (bez dodatkowej „aureoli” z box-shadow).
 */
const E6 = "0 12px 24px rgba(0,0,0,.16)";
const E4 = "0 6px 14px rgba(0,0,0,.12)";

const primaryRing = "#3388FF";
const primaryRingDeep = "#005CE6";
const secondaryBorderRest = "rgba(10, 112, 255, 0.35)";
const secondaryBorderHover = "#0A70FF";

export const primaryHeroButtonStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3388FF, #0A70FF)",
    border: "1px solid #0A70FF",
    boxShadow: E6,
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: "#FFFFFF",
    outline: "none",
    transition:
      "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, border-width 180ms ease, border-color 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "none !important",
      border: `2px solid ${primaryRing}`,
      filter: "saturate(1.05) !important",
      background: "linear-gradient(135deg, #2B7AF2, #005CE6)",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: `${E4} !important`,
      border: `2px solid ${primaryRingDeep}`,
      filter: "none",
    },
  },
};

export const secondaryHeroButtonStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "12px",
    backgroundColor: "#EEF4FF",
    color: "#0D47A1",
    border: `1px solid ${secondaryBorderRest}`,
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    boxShadow: "none",
    outline: "none",
    transition:
      "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, border-width 180ms ease, border-color 180ms ease, background-color 120ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "none !important",
      border: `2px solid ${secondaryBorderHover}`,
      filter: "saturate(1.05) !important",
      backgroundColor: "#E0EAFF",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: `${E4} !important`,
      border: `2px solid ${primaryRingDeep}`,
      filter: "none",
    },
  },
};

export const primaryFilledSubmitButtonStyles = {
  root: {
    boxShadow: E6,
    border: "1px solid transparent",
    outline: "none",
    transition:
      "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, background-color 180ms ease, border-width 180ms ease, border-color 180ms ease",
    "&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
      transform: "translateY(-2px) !important",
      boxShadow: "none !important",
      border: `2px solid ${primaryRing}`,
      filter: "saturate(1.05) !important",
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0) !important",
      boxShadow: `${E4} !important`,
      border: `2px solid ${primaryRingDeep}`,
      filter: "none",
    },
  },
};
