<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-xxl">
      <router-link class="navbar-brand" to="/">umdb</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav-content"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav-content">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'persons-index' }">Persons</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" />
        </form>
      </div>
    </div>
  </nav>
</template>
