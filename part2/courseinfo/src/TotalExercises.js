const TotalExercises = ({course}) => {
	const totalExercises = course.parts.reduce(
		(acc, {exercises}) => acc + exercises,
		0
	)

	return <strong>total of {totalExercises} exercises</strong>
}

export default TotalExercises
