<template>
    <div class="showcase">
        <div class="rectangle">
            <img class="arrow-left" src="@/assets/arrow.png" alt="Arrow" @click="changeImage(-1)"/>
        </div>
        <div class="image-container">
            <img class="showcase-image" :src="currentImage" alt="Showcase" />
        </div>
        <div class="rectangle" >
            <img class="arrow-right" src="@/assets/arrow.png" alt="Arrow" @click="changeImage(1)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        data() {
            return {
                images: [
                    "Fjall.png",
                    "Samsung.png",
                    "Shine.png"
                ],
                currentIndex: 0
            };
        },
        computed: {
            currentImage(): string {
                return require(`../assets/${this.images[this.currentIndex]}`);
            }
        },
        methods: {
            changeImage(direction: number): void {
                this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
            }
        }
    });
</script>

<style>
    .showcase {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 165px;
    }

    .rectangle {
        width: 165px;
        height: 384px;
        background-color: #D9D9D9;
        display: flex;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .arrow-left {
        transform: scale(-1, 1);
        width: 68px;
        height: 68px;
        margin: auto;
    }

    .arrow-right {
        width: 68px;
        height: 68px;
        margin: auto;
    }

    .image-container {
        position: relative;
        margin: 0% 30px;
    }

    .showcase-image {
        width: 1201px;
        height: 501px;
        display: block;
        margin: 0 auto;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
</style>
