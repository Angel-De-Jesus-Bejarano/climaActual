<template>
  <nav>
    <router-link to="/">CLIMA</router-link>  
    <router-link to="/about">DOCUMENTACION</router-link>
    
  </nav>
  <router-view/>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
  background-color: #202020;
}

body{
  margin: 0;
}
*, *:before, *:after {
  box-sizing: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

nav {
  display: flex;
  justify-content: space-around;
  width: 25%;
  padding: 30px;
  margin: auto;

  a {
    font-weight: bold;
    font-size: 20px;
    color: #babcbe;
    text-decoration: none;

    &.router-link-exact-active {
      color: #ffee00;
    }
  }
}
@media (max-width: 400px){
  nav{
    width: 100%;
    height: 120px;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
