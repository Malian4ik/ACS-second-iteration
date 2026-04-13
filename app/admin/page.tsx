import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/admin-auth";
import { getCmsContent, getCmsStorageMode } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLoginForm needsSetup />;
  }

  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  const content = await getCmsContent();
  const storageMode = getCmsStorageMode();

  return <AdminDashboard initialContent={content} storageMode={storageMode} />;
}
