import { useEffect, useState } from "react";

function Experience() {
  const [exp, setExp] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getExp")
      .then((res) => res.json())
      .then((data) => setExp(data));
  }, []);

  return (
    <section className="p-4">
      <h2>Experience</h2>
      <ul>
        {exp.map((item, index) => (
          <li key={index}>
            {item.role} - {item.company} ({item.year})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
