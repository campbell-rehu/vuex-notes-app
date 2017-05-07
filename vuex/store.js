import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import uuid from 'uuid-v4';

Vue.use(Vuex);

// Create the Vuex instance by combining the state and mutations objects
// Then export the Vuex store for use by our components

export default new Vuex.Store({
    actions: {
        addNote({commit}) {
            commit('ADD_NOTE');
        },
        editNote({commit}, text) {
            commit('EDIT_NOTE', text);
        },
        deleteNote({commit}) {
            commit('DELETE_NOTE');
        },
        toggleFavourite({commit}) {
            commit('TOGGLE_FAVOURITE');
        },
        setActiveNote({commit}, note) {
            commit('SET_ACTIVE_NOTE', note);
        },
        show({commit}, selection) {
            commit('SHOW', selection);
        }
    },
    state: {
        notes: [],
        activeNote: {
            id: uuid(),
            text: '',
            favourite: false
        },
        show: 'all'
    }, 
    mutations: {
        ADD_NOTE (state) {
            const newNote = {
                id: uuid(),
                text: 'New Note',
                favourite: false
            };
            state.notes.push(newNote);
            state.activeNote = newNote;        
        },

        EDIT_NOTE (state, text) {
            state.activeNote.text = text;
        },

        DELETE_NOTE (state) {
            const index = state.notes.findIndex(note => note.id === state.activeNote.id);
            state.notes.splice(index, 1);
            if (state.notes[0]) { 
                state.activeNote = state.notes[0] 
            } else {
                const newNote = {
                    id: uuid(),
                    text: 'New Note',
                    favourite: false
                };
                state.notes.push(newNote);
                state.activeNote = newNote;
            }
        },

        TOGGLE_FAVOURITE (state) {
            state.activeNote.favourite = !state.activeNote.favourite;
        },

        SET_ACTIVE_NOTE (state, note) {
            state.activeNote = note;
        },

        SHOW(state, selection) {
            state.show = selection;
        }
    },
    getters: {
        favouriteNotes() {
            if (state.show === 'all'){
                return state.notes
            } else if (state.show === 'favourites') {
                return state.notes.filter(note => note.favourite)
            }
        }
    }
});
