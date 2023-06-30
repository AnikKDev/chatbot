import { openai } from "./config/openAi.js";
import readlineSync from "readline-sync";
import colors from "colors";
// function for calling the task
async function main() {
  /* const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "What is the capital of Bangladesh?",
      },
    ],
  });
  console.log(chatCompletion.data); */

  while (true) {
    const userInput = readlineSync.question(colors.bold.yellow("You: "));
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userInput,
          },
        ],
      });
      // get completion text/content
      const completionText = completion.data.choices[0].message.content;
      if (userInput.toLocaleLowerCase() === "exit") {
        console.log(colors.green("Bot: " + completionText));
        return;
      }
      console.log(colors.green("Bot: " + completionText));
    } catch (error) {
      console.error(colors.bold.red(error));
    }
  }
}
main();
