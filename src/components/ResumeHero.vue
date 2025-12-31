<template>
  <section class="hero">
    <div class="hero-content">
      <div class="headshot-container" v-if="headshot">
        <img :src="headshot" :alt="name" class="headshot" />
      </div>
      <div class="hero-text">
        <h1 class="name">{{ name }}</h1>
        <p class="title">{{ title }}</p>
        <p class="summary">{{ summary }}</p>
      </div>
    </div>
    <div class="hero-actions">
      <button @click="$emit('download')" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download PDF
      </button>
      <button @click="$emit('chat')" class="btn btn-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Chat with Resume
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  title: string
  summary: string
  headshot?: string
}>()

defineEmits<{
  download: []
  chat: []
}>()
</script>

<style scoped>
.hero {
  background: var(--gradient-hero);
  color: var(--color-text);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
}

[data-theme="dark"] .hero {
  color: white;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.headshot-container {
  flex-shrink: 0;
}

.headshot {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

[data-theme="dark"] .headshot {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-text {
  flex: 1;
  min-width: 300px;
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

[data-theme="dark"] .name {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  opacity: 0.95;
  font-weight: 300;
}

.summary {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
  background: linear-gradient(135deg, var(--color-accent-secondary) 0%, var(--color-purple-light) 100%);
}

.btn-secondary {
  background: rgba(139, 92, 246, 0.1);
  color: var(--color-accent);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.btn-secondary:hover {
  background: rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

[data-theme="dark"] .btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
}

[data-theme="dark"] .btn-secondary:hover {
  background: rgba(139, 92, 246, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.5);
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1.5rem;
  }

  .name {
    font-size: 2.5rem;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-actions {
    justify-content: center;
  }
}
</style>

