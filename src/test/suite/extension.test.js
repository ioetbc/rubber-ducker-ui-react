import { describe, it, suite } from "mocha";
import { expect } from "chai";

import { filteredBastards } from "../../webviews/components/Dropdown/helpers";

suite("filter collaborators", () => {
  describe("returns collaborators that match all filters", () => {
    it("should return an array of users that match filters", () => {
      const result = filteredBastards(
        [
          {
            bio: "once upon a time i learnt hmtl",
            githubId: "1234",
            profileURL: "https://avatars.githubusercontent.com/u/51295384?v=4",
            tech: { node: 10, react: 10 },
            username: "ioetbc",
          },
          {
            bio: "once upon a time i learnt hmtl",
            githubId: "1234",
            profileURL: "https://avatars.githubusercontent.com/u/51295384?v=4",
            tech: { node: 10 },
            username: "bob",
          },
          {
            bio: "once upon a time i learnt hmtl",
            githubId: "1234",
            profileURL: "https://avatars.githubusercontent.com/u/51295384?v=4",
            tech: { node: 10 },
            username: "carol",
          },
        ],
        [
          {
            proficiency: 5,
            type: "node",
          },
          {
            proficiency: 5,
            type: "react",
          },
        ]
      );
      expect(result).to.eql([
        {
          bio: "once upon a time i learnt hmtl",
          githubId: "1234",
          profileURL: "https://avatars.githubusercontent.com/u/51295384?v=4",
          tech: { node: 10, react: 10 },
          username: "ioetbc",
        },
      ]);
    });
  });
});
