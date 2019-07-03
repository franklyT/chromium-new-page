const greetingsList = {
  get Morning() {
    const morningArray = [
      `Good morning, ${name}.`,
      `Morning, ${name}!`,
      `Rise and shine, ${name}.`,
      `Buenos dias, ${name}.`,
      `Ciao, ${name}.`,
      `Konichiwa, ${name}-san.`
    ];
    return morningArray[randRange(0, morningArray.length - 1)];
  },

  get Afternoon() {
    // Placeholder, keeping consistency for extensibility
    const afternoonArray = [`Good afternoon, ${name}.`];
    return afternoonArray[randRange(0, afternoonArray.length - 1)];
  },
  get Night() {
    // Placeholder, keeping consistency for extensibility
    const nightArray = [`Good evening, ${name}.`];
    return nightArray[randRange(0, nightArray.length - 1)];
  },

  get Wildcard() {
    const wildcardArray = [
      `Hi there ${name}.`,
      `Hey, ${name}.`,
      `What's up, ${name}?`,
      `Greetings, ${name}.`,
      "GREETINGS!",
      `Salute, ${name}.`,
      `Howdy, ${name}.`,
      `Yo, ${name}.`,
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
    return wildcardArray[randRange(0, wildcardArray.length - 1)];
  },
 // get Holiday() {}
};
