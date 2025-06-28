import { useEffect, useState } from "react";

function Education() {
  const [edu, setEdu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getEdu")
      .then((res) => res.json())
      .then((data) => setEdu(data));
  }, []);

  return (
    <section className="p-4">
      <h2>Education</h2>
      <ul>
        {edu.map((item, index) => (
          <li key={index}>
            {item.degree} - {item.institution} ({item.year})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Education;
