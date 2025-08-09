
export default function Contact() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-lg mb-4">Feel free to reach out if you have questions, want to collaborate, or just want to connect!</p>
      <ul className="mb-4">
        <li className="mb-2"><strong>Email:</strong> paritosh@example.com</li>
        <li className="mb-2"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/paritoshveersingh" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">linkedin.com/in/paritoshveersingh</a></li>
        <li><strong>GitHub:</strong> <a href="https://github.com/paritoshveersingh" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">github.com/paritoshveersingh</a></li>
      </ul>
      <p className="text-lg">I look forward to hearing from you!</p>
    </main>
  );
}
