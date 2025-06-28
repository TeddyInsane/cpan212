import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getSkills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <section className="p-4">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
