const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const test = async () => {
  const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();

  await driver.get("http://localhost:3000");
  console.log("Test 1: If app starts successfully");
  const title = await driver.getTitle();
  console.log(title === "React App" ? "PASS" : "FAIL");

  console.log("---------------------------------------------------------------------------");
  console.log("Test 2: If todo added successfully");

  const existingTodos = await driver.findElements(By.css(".todo-items .todo"));

  const input = await driver.findElement(By.css(".input"));
  await input.sendKeys("First todo");

  await input.sendKeys(webdriver.Key.ENTER);
  const newTodos = await driver.findElements(By.css(".todo-items .todo"));
  console.log("🚀 ~ file: test.js:26 ~ test ~ newTodos", newTodos.length);
  console.log(existingTodos.length < newTodos.length ? "PASS" : "FAIL");

  console.log("---------------------------------------------------------------------");
  console.log("Test 3: If todo is marked as completed");
  const item = await driver.findElement(By.css("#todo-0"));

  const item2 = await item.findElement(By.css(".todo-text"));
  await item2.click();

  const item2Class = await item2.getAttribute("style");
  console.log(item2Class === "text-decoration: line-through;" ? "PASS" : "FAIL");

  console.log("----------------------------------------------------------------------");
  console.log("Test 4: If completed todos are umarked");
  const todo = item2;
  const completedTodoStyle = await todo.getAttribute("style");

  if (completedTodoStyle === "text-decoration: line-through;") {
    await todo.click();
    const completedTodoStyleAfterClick = await todo.getAttribute("style");
    console.log(completedTodoStyleAfterClick !== "text-decoration: none;" ? "PASS" : "FAIL");
  }

  console.log("----------------------------------------------------------------------");
  console.log("Test 5: If todo deleted successfully");

  const deleteButton = await item.findElement(By.css("button"));
  await deleteButton.click();

  const newTodosAfterDelete = await driver.findElements(By.css(".todo-items .todo"));
  console.log(newTodosAfterDelete.length < newTodos.length ? "PASS" : "FAIL");

  await driver.quit();
};

test();
