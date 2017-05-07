<template>
    <div id="notes-list">
        <div id="list-header">
            <h2>Notes</h2>
            <div class="btn-group btn-group-justified" role="group">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default"
                        @click="showAll"
                        :class="{active: this.$store.state.show === 'all'}">
                    All Notes
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default"
                        @click="showFavourites"
                        :class="{active: this.$store.state.show === 'favourites'}">
                    Favourites
                    </button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="list-group">
                <a v-for="note in notes"
                    class="list-group-item" href="#"
                    :class="setActiveNote(note)"
                    @click="setActiveNote(note)">
                    <h4 class="list-group-item-heading">
                        {{note.text.trim().substring(0, 30)}}
                    </h4>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        methods: {
            setActiveNote(note) {
                this.$store.dispatch('setActiveNote', note);
            },
            showAll() {
                this.$store.dispatch('show', 'all');
            },
            showFavourites() {
                this.$store.dispatch('show', 'favourites');                
            }
        },
        computed: {
            show() {
                return this.$store.state.all;
            },
            notes() {
                if (this.$store.state.show === 'favourites') {
                    return this.$store.state.notes.filter(note => note.favourite === true);
                } else {
                    return this.$store.state.notes;
                }
            }
        }
    }

</script>


