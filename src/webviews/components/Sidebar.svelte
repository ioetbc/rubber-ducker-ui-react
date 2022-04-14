<script lang="ts">
  import { onMount } from "svelte";
  import type { User, Page } from "../../types";
  import { isEmpty } from "lodash";

  import Avatar from "./Avatar.svelte";
  import FindTeacher from "./FindTeacher.svelte";
  import Profile from "./Profile.svelte";
  import Teacher from "./Teacher.svelte";
  import ActiveUsers from "./ActiveUsers.svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let user: User | null = null;
  let teacher: User | null = null;
  let accessToken: string = "";
  let page: Page = tsvscode.getState()?.page || "homepage";
  let room: string = "";
  $: tsvscode.setState({ page });

  onMount(async () => {
    window.addEventListener("message", async (event) => {
      const message = event.data;

      switch (message.type) {
        case "newTodo":
          todos = [{ text: message.text, completed: false }, ...todos];
          break;
        case "token":
          accessToken = message.value;
          console.log("the access token", message.value);
          const response = await fetch(`${apiBaseUrl}/me`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });

          console.log("response", response);
          const data = await response.json();
          user = data.user;
          console.log("the fucking user", user);
          break;
      }
    });
    tsvscode.postMessage({ type: "getToken", value: undefined });
  });

  const handlePageSelection = (newPage: Page) => {
    page = newPage;
  };

  const handleTeacherSelection = (selectedTeacher: User) => {
    teacher = selectedTeacher;
  };
</script>

{#if isEmpty(user)}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: "authenticate", value: undefined });
    }}>login with github</button
  >
{:else if page === "homepage" && user}
  <FindTeacher {handlePageSelection} {handleTeacherSelection} {accessToken} />
{:else if page === "profile" && user}
  <Profile {user} {accessToken} />
{:else if page === "teacher" && user && teacher}
  <Teacher {teacher} {user} {accessToken} />
{/if}

<div style="position: fixed; bottom: 16px">
  <button on:click={() => handlePageSelection("profile")}>update profile</button
  >
  <button on:click={() => handlePageSelection("homepage")}>find teacher</button>

  <button
    on:click={() => {
      accessToken = "";
      user = null;
      tsvscode.postMessage({ type: "logout", value: undefined });
    }}>logout</button
  >
</div>
