<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-fixed-top navbar-transparent"
       style="background-color: #ffffff;">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav me-auto">
        <li class="nav-item active">
          <router-link to="/"  class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </ul>

    </div>

    <div class="mx-auto order-0">
      <div class="navbar-brand mx-auto" id="nav-name">VE450 Capstone Design</div>
      <button class="navbar-toggler" type="button"
              data-toggle="collapse" data-target=".dual-collapse2">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href = "https://www.huawei.com/">
            <img src="../assets/huawei.png" width="55" height="56" alt="huawei">
          </a>
        </li>
        <li class="nav-item">
          <a class ="nav-link" href = "https://www.ji.sjtu.edu.cn/">
            <img src="../assets/ji.png" width="324.8" height="56" alt="ji">
          </a>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

#nav-name {
  font-size: 25px;
}

.navbar {
  font-family: 'Playfair Display', serif;
  z-index: 100;
  margin-left: 0;
}
.navbar-transparent {
  background:transparent;
}

</style>
