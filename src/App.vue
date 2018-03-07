<template>
  <div id="app">

    <div class="container">
      <!-- <h1 class="title is-1">HRF Praise Team Schedule Viewer</h1> -->
      <ul>
        <li>
          <router-link class="navbar-item" to="/">
            Home
          </router-link>
        </li>
        <li>
          <router-link class="navbar-item" to="/services">
            Services
          </router-link>
        </li>
        <li>
          <router-link class="navbar-item" to="/test">
            Test
          </router-link>
        </li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
