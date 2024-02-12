import { FieldError } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  title: string;
  description: string;
  status: string;
  complete_on: Date | string | undefined;
};

export type FormFieldProps = {
  name: ValidFieldNames;
  error: FieldError | undefined;
  value?: string|number;
  placeholder?: string;
  options?: {label: string, value: string|number}[];
  type?: string;
  label?: string;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "title" | "description" | "status" | "complete_on" ;

export const TaskSchema: ZodType<FormData> = z.object({
  title: z.string({ required_error: "required field" }).max(255).min(3),
  description: z.string({ required_error: "required field" }).max(1000).min(10),
  status: z.string({ required_error: "required field" }),
  complete_on: z.coerce.date().min(new Date()),
});

export type EditFormData = {
    title: string;
    description: string;
    status: string;
  };

export const EditTaskSchema: ZodType<EditFormData> = z.object({
    title: z.string({ required_error: "required field" }).max(255).min(3),
    description: z.string({ required_error: "required field" }).max(1000).min(10),
    status: z.string({ required_error: "required field" })
  });
