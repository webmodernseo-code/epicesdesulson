"use client";

import GeneralSettingsForm from "@/components/settings/general-settings-form";
import PasswordUpdate from "@/components/settings/general/password-update";
import Notifications from "@/components/settings/general/notifications";

export default function GeneralSettingsClientPage() {
  return (
    <div className="space-y-6">
      <GeneralSettingsForm />
      <Notifications />
      <PasswordUpdate />
    </div>
  );
}
