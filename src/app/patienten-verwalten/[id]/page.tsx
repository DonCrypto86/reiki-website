import { notFound } from "next/navigation";
import { getPatient } from "@/lib/patientsStore";
import PatientDetailManager from "@/components/admin/PatientDetailManager";

export const dynamic = "force-dynamic";

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = await getPatient(params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PatientDetailManager initialPatient={patient} />
    </div>
  );
}
