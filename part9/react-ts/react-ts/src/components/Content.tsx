import React from 'react'
import { CoursesProps, CoursePart } from '../types'
import assertNever from '../utils'

const Content = ({courseParts}: CoursesProps) => {

    const getPart = (part:CoursePart) => {
        switch (part.type) {
            case "normal":
                return (
                    <>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <p style={{marginTop:0}}>{part.description}</p>
                    </>
                )
            case "groupProject":
                return (
                    <>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <p style={{marginTop:0}}>project exercises {part.groupProjectCount}</p>
                    </>
                )
            case "submission":
                return (
                    <>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <p style={{margin:0}}>{part.description}</p>
                        <p style={{marginTop:0}}>submit to {part.exerciseSubmissionLink}</p>
                    </>
                )
            case "special":
                return (
                    <>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <p style={{margin:0}}>{part.description}</p>
                        <p style={{marginTop:0}}>
                            required skills: {part.requirements.map((requeriment, i) => (
                                <span key={i}>{requeriment}{i < part.requirements.length -1 && ', '}</span>
                            ))}
                        </p>
                    </>
                )
            default:
                return assertNever(part)
        }
    }

    return (
        <>
            {courseParts.map((part:CoursePart, i:number) => (
                <div key={i}>
                    {getPart(part)}
                </div>
            
            ))}
        </>
    )
}

export default Content