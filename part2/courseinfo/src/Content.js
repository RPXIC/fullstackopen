import Part from './Part'
import TotalExercises from './TotalExercises'

const Content = ({course}) => (
	<>
		{course.parts.map(course => (
			<Part key={course.id} course={course} />
		))}
		<TotalExercises course={course} />
	</>
)

export default Content
