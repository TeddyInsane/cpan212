import { useEffect, useState } from "react";

function Overview() {
  const [overview, setOverview] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/getOverview")
      .then((res) => res.json())
      .then((data) => setOverview(data.text));
  }, []);

  return (
    <section className="p-4">
      <h2>About Me</h2>
      <p>{overview}</p>
    </section>
  );
}

export default Overview;
