import * as z from "zod";

export const profileFormSchema = z.object({
  // Personal Information
  bio: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
  occupation: z.string().optional(),

  // Address Information
  address: z.string().optional(),
  provinceId: z.string().optional(),
  province: z.string().optional(),
  regencyId: z.string().optional(),
  regency: z.string().optional(),
  districtId: z.string().optional(),
  district: z.string().optional(),
  villageId: z.string().optional(),
  village: z.string().optional(),
  postalCode: z.string().optional(),

  // Social Media
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),

  // Health Information
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),

  // Emergency Contact
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
