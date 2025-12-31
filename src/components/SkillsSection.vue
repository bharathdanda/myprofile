<template>
  <section class="skills-section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-container">
      <div v-for="category in skillCategories" :key="category" class="skill-category">
        <h3 class="category-title">{{ category }}</h3>
        <div class="skills-grid">
          <div
            v-for="skill in getSkillsByCategory(category)"
            :key="skill.name"
            class="skill-item"
          >
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span v-if="skill.level" class="skill-level">{{ skill.level.toFixed(1) }}/5</span>
            </div>
            <div v-if="skill.level" class="skill-bar">
              <div
                class="skill-bar-fill"
                :style="{ width: `${(skill.level / 5) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '@/types/resume'

const props = defineProps<{
  skills: Skill[]
}>()

const skillCategories = computed(() => {
  const categories = new Set<string>()
  props.skills.forEach(skill => {
    categories.add(skill.category || 'Other')
  })
  return Array.from(categories)
})

function getSkillsByCategory(category: string): Skill[] {
  return props.skills.filter(skill => (skill.category || 'Other') === category)
}
</script>

<style scoped>
.skills-section {
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

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-category {
  background: var(--color-background-card);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-accent-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.skill-level {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  transition: color 0.3s ease;
}

.skill-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.5s ease;
}
</style>

