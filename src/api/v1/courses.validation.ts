import { z } from "zod";

import { objectIdSchema } from "../../utils";

// Course Schema
export const courseSchema = z.object({
  id: objectIdSchema,
  authorId: z.string().min(1, "Author is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").optional(),
  instructor: z.string().min(1, "Instructor is required").optional(),
  rating: z.number().min(0).max(5).optional(),
  students: z.number().min(0).optional(),
  duration: z.string().min(1, "Duration is required").optional(),
  price: z.number().min(0).optional(),
  level: z.string().min(1, "Level is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  image: z.string().url().optional(),
  deleted: z.boolean().optional(),
});

// FilterState Schema
export const filterStateSchema = z.object({
  categories: z.array(z.string()),
  levels: z.array(z.string()),
  priceRange: z.tuple([z.number(), z.number()]),
  duration: z.array(z.string()),
  searchQuery: z.string(),
  sortBy: z.string(),
  viewMode: z.enum(["grid", "list"]),
});

// FilterAction Schema
export const filterActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("TOGGLE_CATEGORY"),
    payload: z.string(),
  }),
  z.object({
    type: z.literal("TOGGLE_LEVEL"),
    payload: z.string(),
  }),
  z.object({
    type: z.literal("SET_PRICE_RANGE"),
    payload: z.tuple([z.number(), z.number()]),
  }),
  z.object({
    type: z.literal("TOGGLE_DURATION"),
    payload: z.string(),
  }),
  z.object({
    type: z.literal("SET_SEARCH_QUERY"),
    payload: z.string(),
  }),
  z.object({
    type: z.literal("SET_SORT_BY"),
    payload: z.string(),
  }),
  z.object({
    type: z.literal("SET_VIEW_MODE"),
    payload: z.enum(["grid", "list"]),
  }),
  z.object({
    type: z.literal("RESET_FILTERS"),
    payload: z.undefined(),
  }),
]);

export const createCourseSchema = courseSchema.omit({ id: true });

// Type exports
export type Course = z.infer<typeof courseSchema>;
export type FilterState = z.infer<typeof filterStateSchema>;
export type FilterAction = z.infer<typeof filterActionSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;

// Validation functions
export const validateCourse = (data: unknown) => {
  return createCourseSchema.parse(data);
};

export const validateFilterState = (data: unknown) => {
  return filterStateSchema.parse(data);
};
