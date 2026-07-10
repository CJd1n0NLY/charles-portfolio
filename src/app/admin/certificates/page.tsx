import CertificatesAdminClient from "./CertificatesClient";
import { prisma } from "@/lib/prisma";

export default async function CertificatesPage() {
  // Fetch real records from the DB to pass to the client
  const certificates = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });

  return <CertificatesAdminClient initialCertificates={certificates} />;
}