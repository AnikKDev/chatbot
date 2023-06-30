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
  // store conversation history
  const chatHistory = [];
  while (true) {
    const userInput = readlineSync.question(colors.bold.yellow("You: "));
    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      //   add latest message
      messages.push({ role: "user", content: userInput });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: messages,
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
      //   update history with user input and system response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.bold.red(error));
    }
  }
}
main();
