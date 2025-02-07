import { ErrorTypeEnum } from "@/constants";
import { validateObjectId } from "@/utils";

import { CourseDAL } from "./courses.dal";
import { CreateCourse, validateCourse } from "./courses.validation";

export class CourseService {
  static async createCourse(courseData: CreateCourse) {
    const validatedData = validateCourse(courseData);
    const course = await CourseDAL.createCourse(validatedData);
    return course;
  }

  static async getAllCourses() {
    const courses = await CourseDAL.getAllCourses();
    return courses;
  }

  static async getCourseById(courseId: string) {
    validateObjectId(courseId);
    const course = await CourseDAL.getCourseById(courseId);
    if (!course) {
      throw new Error(ErrorTypeEnum.enum.RESOURCE_NOT_FOUND);
    }
    return course;
  }

  static async updateCourse(courseId: string, courseData: Partial<CreateCourse>) {
    validateObjectId(courseId);
    const validatedData = validateCourse(courseData);
    const course = await CourseDAL.updateCourse(courseId, validatedData);
    if (!course) {
      throw new Error(ErrorTypeEnum.enum.RESOURCE_NOT_FOUND);
    }
    return course;
  }

  static async softDeleteCourse(courseId: string) {
    validateObjectId(courseId);
    const course = await CourseDAL.softDeleteCourse(courseId);
    if (!course) {
      throw new Error(ErrorTypeEnum.enum.RESOURCE_NOT_FOUND);
    }
    return course;
  }

  static async restoreCourse(courseId: string) {
    validateObjectId(courseId);
    const course = await CourseDAL.restoreCourse(courseId);
    if (!course) {
      throw new Error(ErrorTypeEnum.enum.RESOURCE_NOT_FOUND);
    }
    return course;
  }
}
