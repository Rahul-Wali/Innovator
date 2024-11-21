import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Exams from './components/Exams'
import AddExam from './components/AddExam'
import AddPlan from './components/AddPlan'
import About from './components/about'
import NotificationReminder from './components/NotificationReminder';


const App = () => {
  const [showAddExam, setShowAddExam] = useState(false)
  const [exams, setExams] = useState([])

  useEffect(() => {
    const getExams = async() => {
      const examsFromServer = await fetchExams()
      setExams(examsFromServer)
    }

    getExams()
  }, [])

  // Fetch Exams
  const fetchExams = async() => {
    const res = await fetch('http://localhost:5000/exams')
    const data = await res.json()

    return data
  }

  // Fetch Exam
  const fetchExam = async(id) => {
    const res = await fetch(`http://localhost:5000/exams/${id}`)
    const data = await res.json()

    return data
  }

  // Add Exam
  const addExam = async (exam) => {
    const res = await fetch('http://localhost:5000/exams', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(exam),
    })

    const data = await res.json()
    
    setExams([...exams, data])
  }

  // Delete Exam
  const deleteExam = async (id) => {
    await fetch(`http://localhost:5000/exams/${id}`, {
      method: 'DELETE'
    })

    setExams(exams.filter((exam) => exam.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const examToToggle = await fetchExam(id)
    const updExam = { ...examToToggle, reminder: !examToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/exams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updExam),
    })

    const data = await res.json()

    setExams(exams.map((exam) => 
      exam.id === id ? { ...exam, reminder : 
      data.reminder } : exam
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddExam(!showAddExam)} 
        showAdd={showAddExam} />
        {showAddExam && <AddExam onAdd={addExam} />}
        {exams.length > 0 ? <Exams exams={exams} 
        onDelete={deleteExam} 
        onToggle={toggleReminder} /> : 'No Upcoming Exam'}
        <AddPlan exams={exams} />
        <NotificationReminder />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;