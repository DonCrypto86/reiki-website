import { getAllPatients, getUpcomingAppointments } from "@/lib/patientsStore";
import PatientsOverview from "@/components/admin/PatientsOverview";

export const dynamic = "force-dynamic";

export default async function PatientsAdminPage() {
  const [patients, upcoming] = await Promise.all([getAllPatients(), getUpcomingAppointments()]);
  const sorted = [...patients].sort((a, b) => a.name.localeCompare(b.name, "de-CH"));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <PatientsOverview initialPatients={sorted} upcomingAppointments={upcoming} />
    </div>
  );
}
