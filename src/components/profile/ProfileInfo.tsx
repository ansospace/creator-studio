"use client";

import { User } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Typography } from "@/components/ui";
import { Profile } from "@/types";

import { useAppSelector } from "../../redux/store";

interface ProfileInfoProps {
  profile: Profile;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { profile: updatedProfile } = useAppSelector((state) => state.auth);

  if (updatedProfile) {
    profile = updatedProfile;
  }

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
                <Typography variant="h3">{section.label}</Typography>
                <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                  {section.fields.map(
                    (field) =>
                      field.value && (
                        <div key={field.label}>
                          <Typography variant="mutedText">{field.label}</Typography>
                          <Typography>{field.value}</Typography>
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
