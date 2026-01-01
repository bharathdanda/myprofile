<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Choose PDF Quality</h2>
          <button @click="close" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p class="description">Select the quality level for your PDF export:</p>
          <div class="quality-options">
            <div 
              class="quality-option" 
              :class="{ selected: selectedQuality === 'minimal' }"
              @click="selectQuality('minimal')"
            >
              <div class="option-header">
                <h3>Minimal Size</h3>
                <span class="badge">Recommended</span>
              </div>
              <p class="option-description">
                Optimized for file size (under 2MB). Lower image quality but smaller file size, perfect for email attachments and online applications.
              </p>
              <div class="option-details">
                <span class="detail-item">• Lower resolution</span>
                <span class="detail-item">• JPEG compression</span>
                <span class="detail-item">• Smaller file size</span>
              </div>
            </div>
            <div 
              class="quality-option" 
              :class="{ selected: selectedQuality === 'full' }"
              @click="selectQuality('full')"
            >
              <div class="option-header">
                <h3>Full Quality</h3>
              </div>
              <p class="option-description">
                High-quality PDF with crisp text and images. Larger file size, ideal for printing or when quality is paramount.
              </p>
              <div class="option-details">
                <span class="detail-item">• High resolution</span>
                <span class="detail-item">• PNG format</span>
                <span class="detail-item">• Larger file size</span>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button @click="close" class="btn btn-secondary">Cancel</button>
            <button @click="confirm" class="btn btn-primary" :disabled="!selectedQuality">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PDFQuality } from '@/utils/pdfExport'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'confirm': [quality: PDFQuality]
}>()

const selectedQuality = ref<PDFQuality | null>('minimal')

function close() {
  emit('update:isOpen', false)
  selectedQuality.value = 'minimal'
}

function selectQuality(quality: PDFQuality) {
  selectedQuality.value = quality
}

function confirm() {
  if (selectedQuality.value) {
    emit('confirm', selectedQuality.value)
    close()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--color-background);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--color-background-card);
}

.modal-body {
  padding: 1.5rem;
}

.description {
  color: var(--color-text-tertiary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.quality-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.quality-option {
  padding: 1.25rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--color-background-card);
}

.quality-option:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.quality-option.selected {
  border-color: var(--color-accent);
  background: rgba(139, 92, 246, 0.1);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.option-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.badge {
  padding: 0.25rem 0.75rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.option-description {
  color: var(--color-text-tertiary);
  margin-bottom: 0.75rem;
  line-height: 1.6;
  font-size: 0.9rem;
}

.option-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
  background: var(--color-background-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-border);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .quality-options {
    gap: 0.75rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

