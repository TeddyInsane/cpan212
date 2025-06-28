import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8000';

function App() {
  const [overview, setOverview] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState(null);
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const [overviewRes, eduRes, expRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE}/getOverview`),
          fetch(`${API_BASE}/getEdu`),
          fetch(`${API_BASE}/getExp`),
          fetch(`${API_BASE}/getSkills`)
        ]);

        if (!overviewRes.ok || !eduRes.ok || !expRes.ok || !skillsRes.ok) {
          throw new Error('Failed to fetch data from API');
        }

        const overviewData = await overviewRes.json();
        const eduData = await eduRes.json();
        const expData = await expRes.json();
        const skillsData = await skillsRes.json();

        console.log('Data fetched successfully:', { overviewData, eduData, expData, skillsData });

        setOverview(overviewData);
        setEducation(eduData);
        setExperience(expData);
        setSkills(skillsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <h2>Error Loading Portfolio</h2>
        <p>{error}</p>
        <p>Please make sure the server is running on port 8000</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span>{overview?.name}</span>
          </div>
          <div className="nav-menu">
            {['about', 'education', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">{overview?.name}</span>
            </h1>
            <h2 className="hero-subtitle">{overview?.title}</h2>
            <p className="hero-description">{overview?.bio}</p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => setActiveSection('contact')}
              >
                Get In Touch
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setActiveSection('projects')}
              >
                View Projects
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={overview?.profileImage} alt={overview?.name} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="section about-section">
            <div className="container">
              <h2 className="section-title">About Me</h2>
              <div className="about-content">
                <div className="about-text">
                  <p>{overview?.bio}</p>
                  <p><strong>Goals:</strong> {overview?.goals}</p>
                  <div className="interests">
                    <h3>Interests</h3>
                    <div className="interests-list">
                      {overview?.interests?.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <section className="section education-section">
            <div className="container">
              <h2 className="section-title">Education</h2>
              <div className="education-list">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h3>{edu.degree}</h3>
                      <span className="education-year">{edu.year}</span>
                    </div>
                    <p className="education-institution">{edu.institution} - {edu.location}</p>
                    <p className="education-status">{edu.status}</p>
                    {edu.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}

                    {edu.relevantCourses && (
                      <div className="courses">
                        <h4>Relevant Courses:</h4>
                        <ul>
                          {edu.relevantCourses.map((course, idx) => (
                            <li key={idx}>{course}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {edu.achievements && (
                      <div className="achievements">
                        <h4>Achievements:</h4>
                        <ul>
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && skills && (
          <section className="section skills-section">
            <div className="container">
              <h2 className="section-title">Skills & Technologies</h2>

              <div className="skills-grid">
                {Object.entries(skills.technical).map(([category, skillList]) => (
                  <div key={category} className="skill-category">
                    <h3>{category}</h3>
                    <div className="skills-list">
                      {skillList.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <div className="skill-header">
                            <span className="skill-icon">{skill.icon}</span>
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-level">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <div
                              className="skill-progress"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="soft-skills">
                <h3>Soft Skills</h3>
                <div className="soft-skills-list">
                  {skills.soft.map((skill, index) => (
                    <span key={index} className="soft-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="learning-skills">
                <h3>Currently Learning</h3>
                <div className="learning-skills-list">
                  {skills.learning.map((skill, index) => (
                    <span key={index} className="learning-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && experience?.projects && (
          <section className="section projects-section">
            <div className="container">
              <h2 className="section-title">Projects</h2>
              <div className="projects-grid">
                {experience.projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <span className="project-type">{project.type}</span>
                    </div>
                    <p className="project-duration">{project.duration}</p>
                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="section contact-section">
            <div className="container">
              <h2 className="section-title">Get In Touch</h2>
              <div className="contact-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Email:</strong>
                    <a href={`mailto:${overview?.email}`}>{overview?.email}</a>
                  </div>
                  <div className="contact-item">
                    <strong>Phone:</strong>
                    <a href={`tel:${overview?.phone}`}>{overview?.phone}</a>
                  </div>
                  <div className="contact-item">
                    <strong>Location:</strong> {overview?.location}
                  </div>
                  <div className="contact-item">
                    <strong>LinkedIn:</strong>
                    <a href={overview?.linkedin} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                  <div className="contact-item">
                    <strong>GitHub:</strong>
                    <a href={overview?.github} target="_blank" rel="noopener noreferrer">
                      View Repositories
                    </a>
                  </div>
                </div>

                <div className="contact-message">
                  <h3>Let's Connect!</h3>
                  <p>
                    I'm always interested in new opportunities and collaborations.
                    Whether you have a project in mind, want to discuss technology,
                    or just want to connect, feel free to reach out!
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 {overview?.name}. Built with React & Express.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
