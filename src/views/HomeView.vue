<template>
  <div class="resume-container" id="resume-content">
    <ResumeHero
      :name="resumeData.name"
      :title="resumeData.title"
      :summary="resumeData.summary"
      :headshot="resumeData.headshot"
      @download="handleDownload"
      @chat="isChatOpen = true"
    />
    
    <div class="resume-sections">
      <ContactSection :contact="resumeData.contact" />
      <ExperienceSection :experience="resumeData.experience" />
      <SkillsSection :skills="resumeData.skills" />
      <EducationSection :education="resumeData.education" />
      
      <section v-if="resumeData.projects && resumeData.projects.length" class="projects-section">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">
          <div
            v-for="(project, index) in resumeData.projects"
            :key="index"
            class="project-card"
          >
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div v-if="project.link || project.github" class="project-links">
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="project-link">
                View Project
              </a>
              <a v-if="project.github" :href="`https://${project.github}`" target="_blank" rel="noopener" class="project-link">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section v-if="resumeData.certifications && resumeData.certifications.length" class="certifications-section">
        <h2 class="section-title">Certifications</h2>
        <div class="certifications-list">
          <div
            v-for="(cert, index) in resumeData.certifications"
            :key="index"
            class="certification-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span>{{ cert }}</span>
          </div>
        </div>
      </section>
    </div>

    <ChatModal v-model:is-open="isChatOpen" />
    <PDFQualityModal v-model:is-open="isQualityModalOpen" @confirm="handleQualityConfirm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { resumeData } from '@/data/resume'
import ResumeHero from '@/components/ResumeHero.vue'
import ContactSection from '@/components/ContactSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ChatModal from '@/components/ChatModal.vue'
import PDFQualityModal from '@/components/PDFQualityModal.vue'
import { exportToPDF, type PDFQuality } from '@/utils/pdfExport'

const isChatOpen = ref(false)
const isQualityModalOpen = ref(false)

function handleDownload() {
  isQualityModalOpen.value = true
}

async function handleQualityConfirm(quality: PDFQuality) {
  try {
    await exportToPDF(
      'resume-content',
      `${resumeData.name.replace(/\s+/g, '-')}-Resume.pdf`,
      quality
    )
  } catch (error) {
    console.error('Error exporting PDF:', error)
    alert('Failed to export PDF. Please try again.')
  }
}
</script>

<style scoped>
.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-background);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.resume-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.projects-section,
.certifications-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  position: relative;
  padding-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--color-background-card);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.project-description {
  color: var(--color-text-tertiary);
  line-height: 1.6;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.project-link {
  color: var(--color-accent-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.project-link:hover {
  color: var(--color-purple-light);
}

.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.certification-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-card);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.certification-item:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.certification-item svg {
  color: var(--color-accent-secondary);
  flex-shrink: 0;
}

.certification-item span {
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .resume-container {
    padding: 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
