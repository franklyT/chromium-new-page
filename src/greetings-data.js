const greetingsList = {
  get Morning() {
    const morningArray = [
      `Good morning, ${name}!`,
      `Good morning, ${name}!`,
      `Morning, ${name}!`,
      `Rise and shine, ${name}.`,
      `Buenos dias, ${name}.`,
      `Ciao, ${name}.`,
      `Konichiwa, ${name}-san.`
    ];
    return morningArray[randRange(0, 6)];
  },

  get Afternoon() {
    if (1 === 1) {
      return `Good afternoon, ${name}.`;
    }
  },
  get Night() {
    if (1 === 1) {
      return `Good evening, ${name}.`;
    }
  },

  get Wildcard() {
    const wildcardArray = [
      `Hi there ${name}.`,
      `Hey, ${name}.`,
      `What's up, ${name}?`,
      `Greetings, ${name}!`,
      "GREETINGS!",
      `Salute, ${name}.`,
      `Howdy, ${name}.`,
      `Yo, ${name}!`,
      `Good day, ${name}.`,
      `Hello, ${name}.`,
      `Hi, ${name}.`,
      `How are things, ${name}?`,
      `How's it going, ${name}?`,
      `Sup', ${name}?`,
      `What's new, ${name}?`,
      `Well, hello, ${name}.`,
      `Hey, what's up, ${name}?`,
      `Hiya, ${name}.`,
      `How's everything, ${name}?`,
      `Long time no see, ${name}.`
    ];
    return wildcardArray[randRange(0, 20)];
  },
  Holiday: []
};
