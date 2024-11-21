import React, { useState, useEffect } from 'react';

const calculateDays = (exams, days) => {
    days = parseInt(days);
    var dict = {};
    exams.map((exam) => (
        dict[exam.text] = parseInt(exam.diff) + parseInt(exam.score)
    ));
    var total = 0;
    for (var key in dict) {
        total = total + dict[key];
    }

    var retVal = {};
    for (var temp in dict) {
        retVal[temp] = Math.round(dict[temp] / total * days);
    }
    return retVal;
};

const PrintResult = (results) => {
    var out = results.results;
    return (
        <>
            <h2 align='center'>Recommended Study Plan</h2><br />
            {
                Object.keys(out).map((key, index) => (
                    <div className='exam' key={index}>
                        <h3>{key}</h3>
                        <p>Recommend studying for {out[key]} days</p>
                    </div>
                ))
            }
        </>
    );
};

// Student Dashboard Component
const StudentDashboard = () => {
    const [studyPlan, setStudyPlan] = useState(null);

    useEffect(() => {
        // Retrieve the saved study plan from localStorage when the component mounts
        const savedPlan = localStorage.getItem('studyPlan');
        if (savedPlan) {
            setStudyPlan(JSON.parse(savedPlan)); // Parse and set the study plan
        }
    }, []);

    return (
        <div className="student-dashboard">
            <h1>Student Dashboard</h1>
            {studyPlan ? (
                <div>
                    <h2>Your Study Plan</h2>
                    {Object.keys(studyPlan).map((subject, index) => (
                        <div key={index}>
                            <h3>{subject}</h3>
                            <p>Recommended study days: {studyPlan[subject]}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No study plan available. Please generate one.</p>
            )}
        </div>
    );
};

// AddPlan Component (for generating study plan)
const AddPlan = ({ exams }) => {
    const [days, setDays] = useState('');
    const [done, setDone] = useState(false);
    const [result, setResult] = useState();

    const onSubmit = (e) => {
        e.preventDefault();

        if (!days) {
            alert('Please add how many days left to your exam week');
            return;
        } else {
            const result = calculateDays(exams, days);

            // Save the generated study plan to localStorage
            localStorage.setItem('studyPlan', JSON.stringify(result));

            alert('Successfully generated your study plan');
            setResult(result);
            setDone(true);
        }

        setDays('');
    };

    return (
        <>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Days to Exam Week</label>
                    <input 
                        type='text' 
                        placeholder='Example: 30' 
                        value={days} 
                        onChange={(e) => setDays(e.target.value)} 
                    />
                </div>
                <input type='submit' value='Generate Study Plan' className='btn btn-block' />
            </form>
            {done && <PrintResult results={result} />}
        </>
    );
};

export default AddPlan;
export { StudentDashboard };