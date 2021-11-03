import React, { useEffect, useState } from 'react';

const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/course", {
      headers: {
        Authorization: `Bearer ${props.auth.getAccessToken()}`
      }
    })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Network response was not ok.");
    })
    .then(response => setCourses(response.courses))
    .catch(error => setError(error.message));
  }, [])
  
  if (error) return <p>{error}</p>
  return (
    <>
      <h1>Courses</h1>
      {!courses && <p>No courses yet.</p>}
      <ul>
      {courses && courses.map(course => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    </>
  )
}

export default Courses;
