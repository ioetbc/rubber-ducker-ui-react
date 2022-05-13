const getNumberOfOccurencesPerCollaborator = (collaborators) => {
  const potentialCollaboratorUsernames = collaborators.map(
    (collaborator) => collaborator.username
  );

  const getNumberOfOccurences = potentialCollaboratorUsernames.reduce(function (
    obj,
    b
  ) {
    obj[b] = ++obj[b] || 1;
    return obj;
  },
  {});

  return getNumberOfOccurences;
};

const getCollaboratorsThatMatchAllFilters = (
  numberOfOccurences,
  techFilters
) => {
  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  const collaboratorsThatMatchAllFilters =
    Object.filter(
      numberOfOccurences,
      (score) => score === techFilters.length
    ) || {};

  return Object.keys(collaboratorsThatMatchAllFilters);
};

export const filteredBastards = (collaborators, techFilters) => {
  console.log("collaborators bitch", collaborators);

  if (!techFilters.length) return [];
  const numberOfOccurences =
    getNumberOfOccurencesPerCollaborator(collaborators);

  const collaboratorsThatMatchEveryFilter = getCollaboratorsThatMatchAllFilters(
    numberOfOccurences,
    techFilters
  );

  const users = collaboratorsThatMatchEveryFilter.map((collaborator) =>
    collaborators.find((element) => element.username === collaborator)
  );

  return users;
};
