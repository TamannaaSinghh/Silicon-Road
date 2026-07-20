import Script from "next/script";

/**
 * EnableUser Enablestack accessibility widget.
 * The bundle self-initializes on load and renders itself inside a Shadow DOM,
 * so it never inherits or affects site styles.
 */
export default function AccessibilityWidget() {
  const config = {
    colors: { primary: "#44667a" },
    icon: "default",
    widgetPosition: { side: "right" },
    accessibilityStatementUrl: "",
  };

  return (
    <>
      <Script id="enablestack-config" strategy="beforeInteractive">
        {`window.ENABLESTACK_CONFIG = ${JSON.stringify(config)};`}
      </Script>
      <Script
        src="/enablestack/enablestack-widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
