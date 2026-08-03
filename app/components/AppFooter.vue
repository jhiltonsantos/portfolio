<template>
  <footer class="border-t border-outline-variant/40">
    <div class="mx-auto flex max-w-(--spacing-container-max) flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:px-16">
      <AppLogo />


      <p class="text-label-caps uppercase text-on-surface-variant">
        © {{ new Date().getFullYear() }} Hilton Santos
      </p>
    </div>
  </footer>
</template>
