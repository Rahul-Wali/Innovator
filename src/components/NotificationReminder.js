import React, { useEffect, useState } from 'react';

const NotificationReminder = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    useEffect(() => {
        // Request notification permission on app load
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const sendNotification = (title, message) => {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'https://assets.digital-x.eu/small_smart_study_3eb095beaa.png', // Add your custom icon here
            });
        } else {
            alert('Please enable notifications in your browser!');
        }
    };

    const scheduleNotification = (title, message, time) => {
        const now = new Date();
        const reminderTime = new Date(time);

        const delay = reminderTime - now;

        if (delay > 0) {
            setTimeout(() => {
                sendNotification(title, message);
            }, delay);
        } else {
            console.log('Reminder time has already passed!');
        }
    };

    const addTaskWithReminder = () => {
        if (!taskName || !reminderTime) {
            alert('Please enter both task name and reminder time!');
            return;
        }

        const newTask = {
            id: Date.now(),
            name: taskName,
            reminderTime,
        };

        setTasks([...tasks, newTask]);

        // Schedule the reminder notification
        scheduleNotification(
            'Task Reminder',
            `Don't forget to work on: ${taskName}  `,
            reminderTime
        );

        // Reset the input fields
        setTaskName('');
        setReminderTime('');
    };

    return (
        <div>
            <h2>Task Reminder Notifications</h2>

            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                />
                <input
                    type="datetime-local"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                />
                <button onClick={addTaskWithReminder}>Add Task & Set Reminder</button>
            </div>

            <div>
                <h3>Tasks</h3>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <p>{task.name} - Reminder at {new Date(task.reminderTime).toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => sendNotification('Test Notification', 'This is a test!')}>
                Test Notification
            </button>
        </div>
    );
};

export default NotificationReminder;
