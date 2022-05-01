<template>
  <footer class="footer has-background-primary-light">
    <div class="content has-text-centered">
      <p>
        <strong>Personal App</strong> by
        <a href="https://twitter.com/FreedomLoisa">Freedom Loisa</a>. The source
        code is licensed <a>MIT</a>. Check it out on
        <a href="https://github.com/LoisaKitakaya/PersonalApp-Frontend"
          >GitHub</a
        >.
      </p>
      <p>
        Powered by <a href="https://bulma.io">Bulma</a> and
        <a href="https://vuejs.org">Vue.js</a>
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

$Courgette: "Courgette", cursive;

.footer {
  border-top: 1px solid $border-color;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  padding: 1.5rem !important;
  font-family: $Courgette;
}
</style>
