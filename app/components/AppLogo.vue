<template>
  <div class="logo-container">
    <!-- Modern Icon with Gradient -->
    <div class="icon-wrapper">
      <div class="icon-gradient">
        <UIcon name="i-heroicons-heart" class="heart-icon" ></UIcon>
        <UIcon name="i-heroicons-shield-check" class="shield-icon" ></UIcon>
      </div>
    </div>

    <!-- App Name with Modern Typography -->
    <div class="text-content">
      <h1 class="app-name">
        <span class="care-text">Care</span><span class="card-text">Card</span>
      </h1>
      <p class="tagline">Your digital emergency card</p>
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

.icon-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-gradient {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: all 0.3s ease;
}

.icon-gradient:hover {
  transform: rotate(5deg) scale(1.1);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.35);
}

.heart-icon {
  width: 16px;
  height: 16px;
  color: white;
  position: absolute;
  top: 6px;
  left: 6px;
  animation: heartbeat 2s ease-in-out infinite;
}

.shield-icon {
  width: 20px;
  height: 20px;
  color: white;
  position: absolute;
  bottom: 4px;
  right: 4px;
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
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-text {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
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
