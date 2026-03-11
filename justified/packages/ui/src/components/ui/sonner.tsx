import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Toasts are always dark (Notion-style) in both light and dark app themes.
 * Sonner's theme="dark" plus the [data-sonner-toaster] layer in index.css
 * handle styling — no manual overrides needed.
 */
function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      theme="dark"
      className="toaster group"
      offset={{ bottom: "5rem", right: "1.5rem" }}
      {...props}
    />
  );
}

export { Toaster };
