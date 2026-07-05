const freelancers = [
  { id: 1, name: "Anders Hejlsberg", role: "Full-Stack Developer", category: "development", rate: 65, bio: "Experienced in React, Node.js, and AWS. Built scalable web apps for startups.", skills: ["React", "Node.js", "AWS", "TypeScript"] },
  { id: 2, name: "Bill Gates", role: "UI/UX Designer", category: "design", rate: 50, bio: "Pixel-perfect designs with a focus on user experience and accessibility.", skills: ["Figma", "Sketch", "Prototyping", "Design Systems"] },
  { id: 3, name: "Dennis Ritchie", role: "Content Writer", category: "writing", rate: 35, bio: "SEO-optimized content for B2B and B2C audiences. 500+ articles published.", skills: ["SEO", "Copywriting", "Blogging", "Technical Writing"] },
  { id: 4, name: "James Okafor", role: "Data Scientist", category: "data", rate: 90, bio: "ML engineer with deep expertise in Python, TensorFlow, and data pipelines.", skills: ["Python", "TensorFlow", "SQL", "Data Viz"] },
  { id: 5, name: "Richard Stallman", role: "Marketing Strategist", category: "marketing", rate: 45, bio: "Helped 30+ brands grow their online presence with data-driven campaigns.", skills: ["Social Media", "Google Ads", "Analytics", "Email Marketing"] },
  { id: 6, name: "Liam Brown", role: "Mobile Developer", category: "development", rate: 75, bio: "iOS & Android developer with published apps used by millions.", skills: ["Swift", "Kotlin", "Flutter", "Firebase"] },
  { id: 7, name: "Olivia Garcia", role: "Graphic Designer", category: "design", rate: 40, bio: "Brand identity, print, and digital design with a creative edge.", skills: ["Photoshop", "Illustrator", "Branding", "Typography"] },
  { id: 8, name: "Noah Kim", role: "DevOps Engineer", category: "development", rate: 85, bio: "Infrastructure automation and CI/CD pipeline expert.", skills: ["Docker", "Kubernetes", "Terraform", "Linux"] },
  { id: 9, name: "Steve Wozniak", role: "Technical Writer", category: "writing", rate: 40, bio: "Clear, concise documentation for APIs, SDKs, and developer tools.", skills: ["API Docs", "Markdown", "Git", "LaTeX"] },
  { id: 10, name: "Ethan Davis", role: "SEO Specialist", category: "marketing", rate: 38, bio: "Organic growth specialist with 3x traffic increases for clients.", skills: ["SEO Audit", "Link Building", "Keyword Research", "Analytics"] },
  { id: 11, name: "Mia Martinez", role: "Data Analyst", category: "data", rate: 55, bio: "Turning raw data into actionable insights with Python and Tableau.", skills: ["Python", "Tableau", "Excel", "Statistics"] },
  { id: 12, name: "Daniel Lee", role: "Backend Developer", category: "development", rate: 70, bio: "Building robust APIs and microservices with Go and PostgreSQL.", skills: ["Go", "PostgreSQL", "gRPC", "Redis"] },
];

const grid = document.getElementById("freelancerGrid");
const count = document.getElementById("count");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const categoryFilter = document.getElementById("categoryFilter");
const rateFilter = document.getElementById("rateFilter");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");
const modalRate = document.getElementById("modalRate");
const modalSkills = document.getElementById("modalSkills");
const hireBtn = document.getElementById("hireBtn");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const postBtn = document.getElementById("postBtn");

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("");
}

function renderCards(list) {
  grid.innerHTML = list.map(f => `
    <div class="freelancer-card" data-id="${f.id}">
      <div class="avatar">${getInitials(f.name)}</div>
      <h3>${f.name}</h3>
      <div class="role">${f.role}</div>
      <div class="bio">${f.bio}</div>
      <div class="rate">$${f.rate}/hr</div>
      <div class="skills">${f.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}</div>
    </div>
  `).join("");
  count.textContent = list.length;

  document.querySelectorAll(".freelancer-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      const f = freelancers.find(f => f.id === id);
      if (f) openModal(f);
    });
  });
}

function filterFreelancers() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const maxRate = parseInt(rateFilter.value);

  return freelancers.filter(f => {
    const matchQuery = !query ||
      f.name.toLowerCase().includes(query) ||
      f.role.toLowerCase().includes(query) ||
      f.skills.some(s => s.toLowerCase().includes(query)) ||
      f.bio.toLowerCase().includes(query);

    const matchCategory = category === "all" || f.category === category;
    const matchRate = maxRate === 0 || f.rate <= maxRate;

    return matchQuery && matchCategory && matchRate;
  });
}

function updateResults() {
  renderCards(filterFreelancers());
}

function openModal(f) {
  modalName.textContent = f.name;
  modalRole.textContent = f.role;
  modalBio.textContent = f.bio;
  modalRate.textContent = `$${f.rate}/hr`;
  modalSkills.textContent = f.skills.join(", ");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  updateResults();
});

searchInput.addEventListener("input", updateResults);
categoryFilter.addEventListener("change", updateResults);
rateFilter.addEventListener("change", updateResults);

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

hireBtn.addEventListener("click", () => {
  alert("Hire request sent! The freelancer will be in touch shortly.");
  closeModal();
});

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

postBtn.addEventListener("click", () => {
  alert("Post a Project feature coming soon!");
});

updateResults();
