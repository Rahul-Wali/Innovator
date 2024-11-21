
import Exam from './Exam'

const Exams = ({ exams, onDelete, onToggle }) => {
    return (
        <>
            {exams.map((exam, index) => (
                <Exam key={index} exam={exam} 
                onDelete={onDelete} onToggle={onToggle} />
            ))}    
        </>
    )
}

export default Exams
