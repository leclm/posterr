export const mock = [
  {
    id: 1,
    username: "Letícia Lima",
    nick: "leclm",
    joinedDate: "March 25, 2021",
    followersCount: 7,
    followingCount: 5,
    postsCount: 4,
    posts: [
      {
        createdAt: "2025-02-01T17:01:41.756Z",
        id: 1,
        userId: 1,
        text: "Hello",
        type: "normal",
      },
      {
        createdAt: "2025-02-21T17:01:41.756Z",
        id: 2,
        userId: 1,
        text: "Helloooo",
        type: "normal",
      },
    ],
    followers: [
      { 
        id: 2,
        username: "Peter Smith",
        nick: "petersmith",
      },
      {
        id: 3,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
    following: [
      {
        id: 3,
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
    followersCount: 2,
    followingCount: 5,
    postsCount: 2,
    posts: [
      {
        createdAt: "2025-02-22T17:01:41.756Z",
        id: 1,
        userId: 2,
        text: "Test",
        type: "normal",
      },
      {
        createdAt: "2025-02-12T17:01:41.756Z",
        id: 2,
        userId: 2,
        text: "Test post",
        type: "normal",
      },
    ],
    followers: [
      {
        id: 3,
        username: "Mary Oliver",
        nick: "maryoliver",
      }
    ],
    following: [
      {
        id: 1,
        username: "Letícia Lima",
        nick: "leclm",
      },
      {
        id: 3,
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
    followersCount: 3,
    followingCount: 4,
    postsCount: 1,
    posts: [
      {
        createdAt: "2025-02-28T17:01:41.756Z",
        id: 1,
        userId: 3,
        text: "Morning",
        type: "normal",
      },
      {
        createdAt: "2025-02-17T17:01:41.756Z",
        id: 2,
        userId: 3,
        text: "Morning guys",
        type: "normal",
      },
    ],
    followers: [
      {
        id: 1,
        username: "Letícia Lima",
        nick: "leclm",
      },      
      {
        id: 2,
        username: "Peter Smith",
        nick: "petersmith",
      }
    ],
    following: [
      {
        id: 1,
        username: "Letícia Lima",
        nick: "leclm",
      },
      {
        id: 2,
        username: "Peter Smith",
        nick: "petersmith",
      }
    ],
  },
];


export const storeMock = () => {
  localStorage.setItem("mock", JSON.stringify(mock));
};
