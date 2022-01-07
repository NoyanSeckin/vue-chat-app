<template>
  <div class="chat container">
    <h2 class="teal-text">Vue Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages">
          <li class="text-left" v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}: </span>
            <span class="grey-text text-darken-3"> {{ message.message }} </span>
            <span class="grey-text time"> {{ message.time }} </span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import moment from "moment";

import app from "../firebase/init";

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
const db = getFirestore();
const colRef = collection(db, "messages");
const q = query(colRef, orderBy("time"));
export default {
  name: "Chat",
  props: ["name"],
  components: { NewMessage },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    async getMessages() {
      onSnapshot(q, (snapshot) => {
        let recievedMessages = [];
        snapshot.docs.forEach((doc) =>
          recievedMessages.push({
            name: doc.data().name,
            id: doc.id,
            message: doc.data().message,
            time: moment(doc.data().time).format("lll"),
          })
        );
        this.messages = recievedMessages;
      });
    },
  },
  created() {
    this.getMessages().then(() => {
      this.$emit("messages", this.messages);
    });
  },
};
</script>

<style scoped>
.card {
  overflow: auto;
  max-height: 500px;
}
.chat h2 {
  font-size: 2.6rem;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .time {
  display: block;
  font-size: 1.2em;
}
.text-left {
  text-align: left;
}
</style>
