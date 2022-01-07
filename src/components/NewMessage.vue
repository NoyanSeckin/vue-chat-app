<template>
  <div class="new-message">
    <form @submit.prevent="addMessage()">
      <label for="new-message"> New Message (enter to add) </label>
      <input type="text" name="new-message" v-model="newMessage" />
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import app from "../firebase/init";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();
const colRef = collection(db, "messages");
export default {
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null,
      firebaseObj: null,
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        addDoc(colRef, {
          name: this.name,
          message: this.newMessage,
          time: Date.now(),
        });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "Enter a message";
      }
    },
  },
};
</script>
