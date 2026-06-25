import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slož si svůj dort · Anička",
  description:
    "Projdi to krok po kroku, příležitost, chuť, vzhled. Anička z tvých přání složí návrh a doladíte ho spolu.",
};

export default function SlozSiDortLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
