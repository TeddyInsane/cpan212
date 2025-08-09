
export default function Projects() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <ul className="space-y-6">
        <li>
          <h2 className="text-xl font-semibold">Portfolio Website (Lab 5)</h2>
          <p className="text-base">A modern portfolio site built with Next.js, Tailwind CSS, and TypeScript. Features multiple pages and responsive design.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Recipe App</h2>
          <p className="text-base">A MERN stack application for managing and sharing recipes. Includes authentication and CRUD operations.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Bookstore API</h2>
          <p className="text-base">A RESTful API built with Node.js and Express for managing a bookstore inventory, used in previous labs.</p>
        </li>
      </ul>
    </main>
  );
}
