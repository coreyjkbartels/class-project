<script setup>
import { ref, useTemplateRef } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { fetchResponse } from "@/assets/fetch";

const modal = useTemplateRef("modal");
const showToast = ref(false);
const message = ref("");

const userName = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");

const newFirstName = ref("");
const newLastName = ref("");
const newUserName = ref("");
const newEmail = ref("");
const password = ref("");

async function getInfo() {
  const response = await fetchResponse("/user", "GET");

  if (response.status === 200) {
    const data = await response.json();
    userName.value = data.userName;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    email.value = data.email;

    newFirstName.value = firstName.value;
    newLastName.value = lastName.value;
    newUserName.value = userName.value;
    newEmail.value = email.value;
  } else {
    console.log(response.status);
  }
}

getInfo();

async function save() {
  const form = document.querySelector(".mainForm");
  if (!form.reportValidity()) return;

  const data = {
    email: newEmail.value,
    userName: newUserName.value,
    firstName: newFirstName.value,
    lastName: newLastName.value,
    password: password.value,
  };

  const response = await fetchResponse("/user", "PATCH", data);
  if (response.status == 200) {
    console.log("Success");
    message.value = "Success";
    getInfo();
    localStorage.setItem("userName", userName.value);
  } else {
    console.log(response.status);
    message.value = "Failed";
  }

  modal.value.close();
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
}

function cancel(e) {
  newFirstName.value = firstName.value;
  newLastName.value = lastName.value;
  newUserName.value = userName.value;
  modal.value.close(e);
}
</script>

<template>
  <section>
    <div class="column">
      <h2 class="column__title">Profile</h2>
      <div class="infoGrid">
        <div class="infoField">
          <div>First Name</div>
          {{ firstName }}
        </div>
        <div class="infoField">
          <div>Last Name</div>
          {{ lastName }}
        </div>
        <div class="infoField username">
          <div>Username</div>
          {{ userName }}
        </div>
        <div class="infoField email">
          <div>Email</div>
          {{ email }}
        </div>
        <button class="longButton" @click="modal.open">Edit</button>
      </div>
    </div>
  </section>

  <span v-show="showToast" class="toast">{{ message }}</span>

  <div class="wrapper">
    <ModalComponent ref="modal">
      <template #header>
        <h2>Edit</h2>
      </template>
      <template #main>
        <form
          class="mainForm"
          onsubmit="return false"
          :style="{
            width: '300px',
          }"
        >
          <li class="inputGroup">
            <label for="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="newFirstName"
              required
            />
          </li>
          <li class="inputGroup">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              v-model="newLastName"
              required
            />
          </li>
          <li class="inputGroup">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="newEmail"
              required
            />
          </li>
          <li class="inputGroup">
            <label for="userName">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              v-model="newUserName"
              required
            />
          </li>
          <li class="inputGroup">
            <label for="password">Password</label
            ><input
              type="password"
              name="password"
              id="password"
              v-model="password"
              minlength="8"
              required
            />
          </li>
        </form>
      </template>
      <template #footer>
        <div class="buttons">
          <button class="cancel" @click="cancel">Cancel</button>
          <button class="save" @click="save">Save</button>
        </div>
      </template>
    </ModalComponent>
  </div>
</template>

<style scoped>
.infoGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.infoField {
  background-color: hsl(0 0% 95%);
  border-radius: 5px;
  padding: 5px;
  height: 50px;
}

.infoField div {
  font-size: 0.8rem;
}

.username,
.email,
.infoGrid > button {
  grid-column: span 2;
}

.longButton {
  width: 60%;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.toast {
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  margin: auto;

  padding: 0.25em 1.5em;
  background-color: hsl(0 0% 95%);
  border-radius: 7px;
}
</style>
