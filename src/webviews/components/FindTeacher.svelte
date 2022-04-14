<script lang="ts">
  import { onMount } from "svelte";
  import type {
    User,
    Page,
    TechnologyTypes,
    TeacherFilters,
  } from "../../types";
  import {
    handleTechnologyType,
    handleTechnologyProficiency,
  } from "../utils/filterTeacher/index";
  import ActiveUsers from "./ActiveUsers.svelte";
  import Messages from "./Messages.svelte";

  export let accessToken: string;
  export let handlePageSelection: (arg0: Page) => void;
  export let handleTeacherSelection: (arg0: User) => void;

  let teacherFilters: TeacherFilters = {
    minStarRating: 1,
    technologies: [],
    teacherPrice: 200,
  };
  let users: User[] = [];
  let advancedSearch: boolean = false;

  onMount(async () => {
    handleAllUsers();
  });

  const handleAllUsers = async () => {
    users = await (
      await fetch(`${apiBaseUrl}/allUsers`, {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  };

  const handleFormChange = async () => {
    users = await (
      await fetch(`${apiBaseUrl}/findTeachers`, {
        method: "POST",
        body: JSON.stringify(teacherFilters),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  };

  const handleAdvancedSearch = () => {
    advancedSearch = !advancedSearch;
  };

  const handleProficiencyInput = (event: any, technology: TechnologyTypes) => {
    teacherFilters = handleTechnologyProficiency({
      value: event.target.value,
      technology,
      currentFilters: teacherFilters,
    });
  };

  const handleTeacher = (selectedTeacher: User) => {
    handleTeacherSelection(selectedTeacher);
    handlePageSelection("teacher");
  };

  const handleMinStarRating = () => {
    const minStarRating: any = document.getElementById("star-rating");
    teacherFilters.minStarRating = minStarRating.value;
  };

  const handleTeacherMaxPrice = () => {
    const teacherPrice: any = document.getElementById("teacher-price");
    teacherFilters.teacherPrice = teacherPrice.value;
  };

  const handleTechnologyInput = async (event: any) => {
    teacherFilters = handleTechnologyType({
      teacherFilters,
      value: event?.target?.value,
    });
    await handleFormChange();
  };

  const removeTechnologyType = async (technology: any) => {
    teacherFilters.technologies = teacherFilters.technologies.filter(
      (tech) => tech.type !== technology
    );

    if (teacherFilters.technologies.length > 0) {
      await handleFormChange();
    } else {
      await handleAllUsers();
    }
  };
</script>

<div class="filter-container">
  <select
    class="select"
    name="technologies"
    id="technologies"
    on:input={handleTechnologyInput}
  >
    <option value="none" selected disabled hidden>select technologies</option>
    <option value="javascript">javascript</option>
    <option value="html">html</option>
    <option value="css">css</option>
    <option value="node">node</option>
    <option value="python">python</option>
    <option value="react">react</option>
    <option value="svelte">svelte</option>
    <option value="postgres">postgres</option>
    <option value="dynamo_db">dynamo_db</option>
    <option value="tensorflow">tensorflow</option>
  </select>

  <div class="advanced-search" on:click={() => handleAdvancedSearch()}>
    <p>advanced</p>
  </div>
  <!-- <select
    class="select"
    name="teacher-price"
    id="teacher-price"
    on:input={handleTeacherMaxPrice}
  >
    <option value={1}>£0</option>
    <option value={10}>£10</option>
    <option value={50}>£50</option>
    <option value={75}>£75</option>
    <option value={100}>£100</option>
    <option value={125}>£125</option>
    <option value={150}>£150</option>
    <option value={175}>£175</option>
    <option value={200}>£200</option>
  </select> -->
</div>

<div class="pill-container">
  {#each teacherFilters.technologies as technology}
    <div class="pill">
      <p><strong>{technology.type}</strong></p>
    </div>
    <div class="remove">
      <p on:click={() => removeTechnologyType(technology.type)}>X</p>
    </div>
  {/each}
</div>

{#if advancedSearch}
  <p>for each technology tell us how proficient the teacher needs to be</p>
  <ul>
    {#each teacherFilters.technologies as technology}
      <div class="flex">
        <li>{technology.type}</li>
        <li>{technology.proficency}</li>
        <select
          name="proficiency"
          id="technology-proficiency"
          on:input={(event) => handleProficiencyInput(event, technology.type)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    {/each}
  </ul>

  <p>
    only show me search results for teachers that have a minimum star rating of
  </p>
  <select name="star-rating" id="star-rating" on:input={handleMinStarRating}>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>
{/if}

<ActiveUsers {accessToken} {users} {handleTeacher} />
<Messages
  messages={[
    {
      online: true,
      username: "bob",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set2",
    },
    {
      online: true,
      username: "jack",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set3",
    },
    {
      online: true,
      username: "jane",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set1",
    },
    {
      online: true,
      username: "greg",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set4",
    },
    {
      online: true,
      username: "bob",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set2",
    },
    {
      online: true,
      username: "jack",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set3",
    },
    {
      online: true,
      username: "jane",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set1",
    },
    {
      online: true,
      username: "greg",
      intro: "Lorem nulla culpa quis cupidatat ipsum laboris qui irure.",
      avatar: "https://robohash.org/aautfugit.png?size=50x50&set=set4",
    },
  ]}
/>

<style>
  .filter-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
  }
  .advanced-search {
    cursor: pointer;
    background: blue;
    padding: 4px;
    color: white;
  }
  .pill {
    background: green;
    padding: 4px 12px;
    display: inline-flex;
    text-transform: uppercase;
    font-size: 10px;
    color: white;
    user-select: none;
  }
  .remove {
    display: flex;
    justify-content: center;
    cursor: pointer;
    background: red;
    margin-left: -8px;
  }
  .button-container {
    margin-top: 24px;
  }
  .helper-wrapper {
    display: flex;
    justify-content: center;
  }
  /* .helper-wrapper .helper-pill {
    width: 30px;
  } */
</style>
