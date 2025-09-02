<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-grey-4 full-height full-width row justify-center items-center"
  >
    <q-page-container>
      <div class="full-width full-height flex flex-center">
        <q-card>
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
