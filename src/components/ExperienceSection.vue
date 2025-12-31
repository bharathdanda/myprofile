<template>
  <section class="experience-section">
    <h2 class="section-title">Experience</h2>
    <div class="timeline">
      <div
        v-for="(exp, index) in experience"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="experience-header">
            <div class="company-info">
              <img 
                v-if="exp.logo" 
                :src="exp.logo" 
                :alt="`${exp.company} logo`"
                class="company-logo"
              />
              <div>
                <h3 class="job-title">{{ exp.title }}</h3>
                <p class="company">{{ exp.company }}</p>
              </div>
            </div>
            <div class="experience-meta">
              <span class="date">
                {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '') }}
              </span>
              <span v-if="exp.location" class="location">{{ exp.location }}</span>
            </div>
          </div>
          <ul class="description-list">
            <li v-for="(desc, i) in exp.description" :key="i">{{ desc }}</li>
          </ul>
          <div v-if="exp.technologies && exp.technologies.length" class="technologies">
            <span
              v-for="tech in exp.technologies"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Experience } from '@/types/resume'

defineProps<{
  experience: Experience[]
}>()

function formatDate(date?: string): string {
  if (!date) return ''
  const parts = date.split('-')
  if (parts.length < 2) return date
  const [year, month] = parts
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthIndex = parseInt(month || '1', 10) - 1
  return `${monthNames[monthIndex] || month} ${year}`
}
</script>

<style scoped>
.experience-section {
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

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient-primary);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: 3px solid var(--color-background-card);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.timeline-content {
  background: var(--color-background-card);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  padding: 8px;
  border-radius: 8px;
  flex-shrink: 0;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.company {
  font-size: 1.1rem;
  color: var(--color-accent-secondary);
  font-weight: 500;
  margin: 0;
}

.experience-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  text-align: right;
}

.date {
  font-weight: 600;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.location {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
}

.description-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.description-list li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: var(--color-text-tertiary);
  transition: color 0.3s ease;
}

.description-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .experience-header {
    flex-direction: column;
  }

  .experience-meta {
    align-items: flex-start;
    text-align: left;
  }
}
</style>

