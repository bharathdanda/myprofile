<template>
  <section class="education-section">
    <h2 class="section-title">Education</h2>
    <div class="education-list">
      <div
        v-for="(edu, index) in education"
        :key="index"
        class="education-item"
      >
        <div class="education-header">
          <div>
            <h3 class="degree">{{ edu.degree }}</h3>
            <p class="institution">{{ edu.institution }}</p>
            <p v-if="edu.location" class="location">{{ edu.location }}</p>
          </div>
          <div class="education-meta">
            <span v-if="edu.graduationDate" class="date">{{ edu.graduationDate }}</span>
            <span v-if="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</span>
          </div>
        </div>
        <div v-if="edu.honors && edu.honors.length" class="honors">
          <span
            v-for="honor in edu.honors"
            :key="honor"
            class="honor-badge"
          >
            {{ honor }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Education } from '@/types/resume'

defineProps<{
  education: Education[]
}>()
</script>

<style scoped>
.education-section {
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

.education-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-item {
  background: var(--color-background-card);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.education-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.degree {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.institution {
  font-size: 1.1rem;
  color: var(--color-accent-secondary);
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.location {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0;
  transition: color 0.3s ease;
}

.education-meta {
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

.gpa {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
}

.honors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.honor-badge {
  padding: 0.25rem 0.75rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

