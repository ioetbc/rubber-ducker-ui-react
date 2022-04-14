<script lang="ts">
  import type { User } from "../../types";

  export let user: User;
  export let handleTeacher: any;
</script>

<ul>
  <li class="avatar-wrapper" on:click={() => handleTeacher(user)}>
    <img class="avatar-image" src={user?.avatar_url} alt="profile avatar" />
    <p class="username">{user?.username}</p>
  </li>
</ul>

<style>
  ul {
    list-style: none;
    padding-left: 0;
  }
  .avatar-wrapper {
    display: flex;
    flex-direction: column;
    width: 90px;
    background: #0000ff;
    padding: 14px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
  }
  .avatar-wrapper:hover {
    background: #2d2dff;
  }
  .avatar-wrapper::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: -5px;
    right: -5px;
    background: greenyellow;
  }
  .avatar-wrapper .username {
    width: 90px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    padding: 0 10px;
    margin-top: 10px;
  }
  .avatar-image {
    width: 50px;
    border-radius: 50%;
  }
</style>
