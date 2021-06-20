export interface Courses {
  name: string
  exerciseCount: number
}

export interface NameProps {
  name: string
}

export interface CoursesProps {
  courseParts: CoursePart[]
}

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CursePartWithDescription {
  description: string
}

interface CourseNormalPart extends CoursePartBase, CursePartWithDescription {
  type: "normal"
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase, CursePartWithDescription {
  type: "submission"
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartBase, CursePartWithDescription {
  type: "special"
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart