import AdminPanelUploadExecutive from "@/components/Admin/AdminPanel";
import AdminPanelUploadHOD from "@/components/Admin/HODAdminPanel";
import AdminPanelUploadQuestion from "@/components/Admin/OnlineTest";
import UploadPastQuestions from "@/components/Admin/uploadPastQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Setup Page - Admin Panel To Upload Data",
  description: "This is the Admin Page Up page",
  // other metadata
};

export default function AdminSetup() {
  return (
    <>
      <AdminPanelUploadExecutive />
      <AdminPanelUploadHOD />
      <AdminPanelUploadQuestion />
      <UploadPastQuestions />
    </>
  );
}
