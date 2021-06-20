import React from 'react'
import { Courses, CoursesProps } from '../types'

const Total = ({courseParts}: CoursesProps) => (
    <p> Number of exercises{" "}
        {courseParts.reduce((carry: number, part: Courses) => carry + part.exerciseCount, 0)}
    </p>
)

export default Total