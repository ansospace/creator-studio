import { User } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Profile } from "@/types";

interface ProfileInfoProps {
  profile: Profile;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const profileSections = [
    {
      label: "Basic Information",
      fields: [
        { label: "Username", value: profile.user.username },
        { label: "Email", value: profile.user.email },
        { label: "Bio", value: profile.profile?.bio },
        { label: "Phone", value: profile.profile?.phoneNumber },
      ],
    },
    {
      label: "Address",
      fields: [
        { label: "Street", value: profile.profile?.address?.street },
        { label: "City", value: profile.profile?.address?.city },
        { label: "Country", value: profile.profile?.address?.country },
        { label: "Zip Code", value: profile.profile?.address?.zipCode },
      ],
    },
    {
      label: "Social Links",
      fields: [
        { label: "Twitter", value: profile.profile?.socialLinks?.twitter },
        { label: "LinkedIn", value: profile.profile?.socialLinks?.linkedin },
        { label: "GitHub", value: profile.profile?.socialLinks?.github },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>Your current profile details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {profileSections.map((section) => {
            const hasValues = section.fields.some((field) => field.value);
            if (!hasValues) return null;

            return (
              <div key={section.label} className="space-y-3">
                <h3 className="font-semibold text-foreground">{section.label}</h3>
                <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                  {section.fields.map(
                    (field) =>
                      field.value && (
                        <div key={field.label}>
                          <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                          <p className="text-foreground">{field.value}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
