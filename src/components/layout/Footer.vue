<template>
  <footer class="footer has-background-primary-light">
    <div class="content has-text-centered">
      <p>
        <strong>Personal App</strong> by <a href="#">Freedom Loisa</a>. The
        source code is licensed <a href="#">MIT</a>. Check it out on
        <a href="#">GitHub</a>.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
$border-color: hsl(0, 0%, 71%);

.footer {
  border: 1px solid $border-color;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
</style>
