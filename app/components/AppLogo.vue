<template>
  <div class="logo-container">
    <!-- Logo Image -->
    <div class="icon-wrapper">
      <img src="/CareCard.svg" alt="Logo" class="logo-image" />
    </div>

    <!-- App Name with Modern Typography -->
    <div class="text-content">
      <h1 class="app-name">
        <span class="care-text">Care</span><span class="card-text">Card</span>
      </h1>
      <p class="tagline">{{ $t('app.tagline') }}</p>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-container:hover {
  transform: translateY(-1px);
}

.icon-wrapper {
  position: relative;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  height: 100%;
  width: auto;
  object-fit: contain;
  /* Filter to drop shadow matching the text style if needed */
  filter: drop-shadow(0 4px 6px rgba(0, 204, 255, 0.2));
  transition: all 0.3s ease;
}

.logo-image:hover {
  transform: rotate(5deg) scale(1.1);
  filter: drop-shadow(0 8px 12px rgba(0, 204, 255, 0.3));
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-name {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 0;
}

.care-text {
  /* Cyan gradient */
  background: linear-gradient(135deg, #00ccff, #0099ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-text {
  /* Blue gradient */
  background: linear-gradient(135deg, #0066ff, #00ccff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1;
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.dark .tagline {
  color: #94a3b8;
}

.logo-container:hover .tagline {
  opacity: 1;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .logo-container {
    gap: 10px;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .icon-gradient {
    border-radius: 10px;
  }

  .heart-icon {
    width: 14px;
    height: 14px;
    top: 5px;
    left: 5px;
  }

  .shield-icon {
    width: 18px;
    height: 18px;
    bottom: 3px;
    right: 3px;
  }

  .app-name {
    font-size: 1.125rem;
  }

  .tagline {
    font-size: 0.6875rem;
  }
}
</style>
