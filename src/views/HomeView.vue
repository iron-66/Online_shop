<template>
  <div class="home">
    <Showcase/>
    <Catalog/>
    <Contacts/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShowcaseContent from '@/components/Showcase.vue';
import CatalogContent from '@/components/Catalog.vue';
import ContactsContent from '@/components/Contacts.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Showcase: ShowcaseContent,
    Catalog: CatalogContent,
    Contacts: ContactsContent,
  },
});
</script>
