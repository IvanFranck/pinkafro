<template>
    <header>
      <div class="logo">
        <span class="logo__pink">pink</span>
        <span class="logo__balck">afro</span>
      </div>
      <nav class="navbar">
        <ul class="navbar-items">
          <router-link class="link link__active" tag="a" to="/">
            <span class="link-text">Home</span>
            <span class="bottom-line"></span>
          </router-link>
          <router-link class="link link__active"  to="/our-services" tag="a">
            <span class="link-text">OUR SERVICES</span>
            <span class="bottom-line"></span>
          </router-link>
          <router-link class="link link__active" to="/find-treatement" tag="a">
            <span class="link-text">FIND TREATEMENT</span>
            <span class="bottom-line"></span>
          </router-link>
          <li class="link link__active dropdown-start">
            <span class="link-text">PANELS</span>
            <span class="bottom-line"></span>
            <div class="dropdown">
              <ul class="inner">
                <router-link class="link" tag="a" to="/panels/customer">
                  <span >Customer panel</span>
                </router-link>
                <router-link class="link" tag="a" to="/panels/service-provider">
                  <span >service provider panel</span>
                </router-link>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
</template>