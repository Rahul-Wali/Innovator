import { useState } from 'react'

const AddExam = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [score, setScore] = useState('')
    const [diff, setDiff] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please add an exam')
            return
        } else {
            alert('Successfully submitted')
        }

        onAdd({ text, score, diff, day, reminder })

        setText('')
        setScore('')
        setDiff('')
        setDay('')
        setReminder('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Exam</label>
                <input type='text' placeholder='Example: Calculus I Midterm' 
                value={text} onChange={(e) => 
                setText(e.target.value)} />
            </div>
            <div className='form-control form-control-select'>
                <label>Select Score Aim</label>
                <select className='form-control-option' value={score}
                onChange={(e) => setScore(e.target.value)}>
                    <option value="" disabled defaultValue>Select a Grade</option>
                    <option value="90">A</option>
                    <option value="80">B</option>
                    <option value="70">C</option>
                    <option value="60">D</option>
                    <option value="50">F</option>
                </select>
            </div>
            <div className='form-control form-control-select'>
                <label>Select Difficulty</label>
                <select className='form-control-option' value={diff} 
                onChange={(e) => setDiff(e.target.value)}>
                    <option value="" disabled defaultValue>Select a Level</option>
                    <option value="50">Super Hard</option>
                    <option value="40">Hard</option>
                    <option value="30">Moderate</option>
                    <option value="20">Easy</option>
                    <option value="10">Super Easy</option>
                </select>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='date' placeholder='Example: Mar 19th at 2:30pm'
                value={day} onChange={(e) => 
                setDay(e.target.value)} />
            </div>
            <input type='submit' value='Save Exam' 
            className='btn btn-block' />
        </form>
    )
}

export default AddExam