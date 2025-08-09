
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to My Portfolio</h1>
      <p className="text-lg mb-6 max-w-xl text-center">
        Hi! I’m a web developer passionate about building modern, responsive applications. This portfolio was created for CPAN 212 Lab 5 using Next.js, Tailwind CSS, and TypeScript.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc list-inside text-left">
          <li>React & Next.js</li>
          <li>Tailwind CSS</li>
          <li>TypeScript & JavaScript</li>
          <li>Node.js & Express</li>
          <li>MongoDB</li>
        </ul>
      </div>
      <a href="/projects" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">View My Projects</a>
    </main>
  );
}
