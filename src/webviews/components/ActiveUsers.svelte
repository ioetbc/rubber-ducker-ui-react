<script lang="ts">
  import Avatar from "./Avatar.svelte";

  import type { User } from "../../types";

  export let accessToken: string;
  export let users: User[];
  export let handleTeacher: any;

  let expandContainer = false;
</script>

<div
  class="scrolling-container"
  style={`height: ${expandContainer ? "100%" : "332px"}`}
>
  {#each users as user}
    <Avatar {user} {handleTeacher} />
  {/each}
</div>
<div class="expand-button-container">
  <p
    class="expand-button"
    on:click={() => (expandContainer = !expandContainer)}
  >
    {expandContainer ? "show less" : "show more"}
  </p>
</div>

<style>
  .scrolling-container {
    background: red;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    width: 100%;
    padding: 24px 24px 12px 24px;
    overflow-y: scroll;
  }
  .expand-button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .expand-button {
    background: blue;
    cursor: pointer;
    display: inline-block;
  }
</style>
