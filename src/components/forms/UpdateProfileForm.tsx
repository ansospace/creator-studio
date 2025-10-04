"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";
import { Path } from "react-hook-form";

import { FormGenerator } from "@/components/global";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Typography } from "@/components/ui";
import { PROFILE_FORM_FIELDS } from "@/constants";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { Profile, ProfileSchema } from "@/types";

interface UpdateProfileFormProps {
  profile: Profile;
}

export const UpdateProfileForm = ({ profile }: UpdateProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { isPending, handleSubmit, register, errors, onSubmit } = useUpdateProfile(profile);

  const renderFormSection = (title: string, description: string, fields: typeof PROFILE_FORM_FIELDS) => (
    <Card className="transition-all hover:shadow-xs">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            register={register}
            errors={errors}
            name={field.name as Path<ProfileSchema>}
            disabled={!isEditing}
          />
        ))}
      </CardContent>
    </Card>
  );

  const basicFields = PROFILE_FORM_FIELDS.filter(
    (field) => !field.name.includes("address") && !field.name.includes("socialLinks")
  );
  const addressFields = PROFILE_FORM_FIELDS.filter((field) => field.name.includes("address"));
  const socialFields = PROFILE_FORM_FIELDS.filter((field) => field.name.includes("socialLinks"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          <Typography variant="h3">Profile Details</Typography>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {renderFormSection("Basic Information", "Your personal details and contact information.", basicFields)}
        {renderFormSection("Address Information", "Your current address details.", addressFields)}
        {socialFields.length > 0 && renderFormSection("Social Links", "Your social media profiles.", socialFields)}

        {isEditing && (
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        )}
      </form>
    </div>
  );
};
