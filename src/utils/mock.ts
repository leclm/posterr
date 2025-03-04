export const mock = [
  {
    id: 0,
    username: "Letícia Lima",
    nick: "leclm",
    joinedDate: "March 25, 2021",
    followersCount: 2,
    followingCount: 1,
    posts: [
      {
        createdAt: "2025-02-01T17:01:41.756Z",
        id: 10,
        userId: 0,
        text: "Hello :)",
        type: "normal",
      },
      {
        createdAt: "2025-02-21T17:01:41.756Z",
        id: 20,
        userId: 0,
        text: "Hello!",
        type: "normal",
      },
    ],
    followers: [
      {
        id: 1,
        username: "Peter Smith",
        nick: "petersmith",
      },
      {
        id: 2,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
    following: [
      {
        id: 2,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
  },
  {
    id: 1,
    username: "Peter Smith",
    nick: "petersmith",
    joinedDate: "July 11, 2011",
    followersCount: 1,
    followingCount: 2,
    posts: [
      {
        createdAt: "2025-02-22T17:01:41.756Z",
        id: 11,
        userId: 1,
        text: "Test",
        type: "normal",
      },
      {
        createdAt: "2025-02-12T17:01:41.756Z",
        id: 21,
        userId: 1,
        text: "Test post",
        type: "normal",
      },
    ],
    followers: [
      {
        id: 2,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
    following: [
      {
        id: 0,
        username: "Letícia Lima",
        nick: "leclm",
      },
      {
        id: 2,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
  },
  {
    id: 2,
    username: "Mary Oliver",
    nick: "maryoliver",
    joinedDate: "September 20, 2024",
    followersCount: 2,
    followingCount: 2,
    posts: [
      {
        createdAt: "2025-02-28T17:01:41.756Z",
        id: 12,
        userId: 2,
        text: "Morning",
        type: "normal",
      },
      {
        createdAt: "2025-02-17T17:01:41.756Z",
        id: 22,
        userId: 2,
        text: "Morning guys",
        type: "normal",
      },
    ],
    followers: [
      {
        id: 0,
        username: "Letícia Lima",
        nick: "leclm",
      },
      {
        id: 1,
        username: "Peter Smith",
        nick: "petersmith",
      }
    ],
    following: [
      {
        id: 0,
        username: "Letícia Lima",
        nick: "leclm",
      },
      {
        id: 1,
        username: "Peter Smith",
        nick: "petersmith",
      }
    ],
  },
];


export const storeMock = () => {
  localStorage.setItem("mock", JSON.stringify(mock));
};
