<template>
    <div id="note-editor">
        <textarea
            :value="activeNoteText"
            v-on:input="editNote"
            class="formcontrol"
        >
        </textarea>
    </div>
</template> 
<script>
    import {mapActions, mapState} from 'vuex';
    export default {
        computed: {
            activeNoteText() {
                return this.$store.state.activeNote.text;
            }
        },
        methods: {
            editNote(e) {
                this.$store.dispatch('editNote', e.target.value);
            }

        }
    }
</script>