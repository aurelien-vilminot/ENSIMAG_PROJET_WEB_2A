/**
 * This function connects the user on app launch
 * @param goBackBeforeLogin True if you are on home page
 * @returns {Promise<void>}.
 */
export async function connectUser(username, goBackBeforeLogin) {
  if (goBackBeforeLogin) {
    await expect(element(by.text(`Home - ${username}`))).toBeVisible();
    await device.pressBack();
  }
  await element(by.text('Login')).tap();

  await element(by.id('username')).replaceText(username);
  await element(by.id('username')).tapReturnKey();

  await element(by.id('password')).replaceText('123456');
  await element(by.id('password')).tapReturnKey();

  await element(by.text('Login')).tap();
}

export async function registerUser(username) {
  await element(by.text('Sign up')).tap();

  await element(by.id('username')).replaceText(username);
  await element(by.id('username')).tapReturnKey();

  await element(by.id('password')).replaceText('123456');
  await element(by.id('password')).tapReturnKey();
  await element(by.id('passwordVerify')).replaceText('123456');
  await element(by.id('passwordVerify')).tapReturnKey();

  await element(by.text('Register')).tap();
  await expect(element(by.text(`Home - ${username}`))).toBeVisible();
}

// Note : this function works only from home page
export async function createStory(title, paragraphContent, isPublic) {
  await element(by.id('addStoryButton')).tap();

  await element(by.id('title')).replaceText(title);
  await element(by.id('paragraph')).replaceText(paragraphContent);
  isPublic !== undefined && isPublic === true ? await element(by.id('pub')).tap() : null;
  await element(by.id('submit')).tap();
}

// Note: function works only from set paragaphs screen
export async function createParagraph(
  title,
  paragraph,
  parentParagraph,
  { isConclusion = false, condition = null, childParagraph = null } = {}
) {
  await element(by.id('addParagraphButton')).tap();
  await element(by.text('Create paragraph')).tap();

  await element(by.id('title')).tap();
  await element(by.id('title')).replaceText(title);
  await device.pressBack();

  await element(by.id('paragraph')).tap();
  await element(by.id('paragraph')).replaceText(paragraph);
  await device.pressBack();

  await element(by.text('Pick parent paragraph')).tap();
  await element(by.text(parentParagraph)).tap();

  if (isConclusion) {
    await element(by.id('conclusion')).tap();
  }

  if (condition != null) {
    await element(by.text('Pick a condition')).tap();
    await element(by.text(condition)).tap();
  }

  if (childParagraph != null) {
    await element(by.text('Pick child paragraph')).tap();
    await element(by.text(parentParagraph)).tap();
  }

  await element(by.id('submit')).tap();
}

// Note : same as last function
export async function createChoice(
  title,
  parentParagraph,
  childParagraph,
  { condition = null } = {}
) {
  await element(by.id('addParagraphButton')).tap();
  await element(by.text('Create choice')).tap();

  await element(by.id('title')).tap();
  await element(by.id('title')).replaceText(title);
  await device.pressBack();

  await element(by.text('Pick parent paragraph')).tap();
  await element(by.text(parentParagraph)).tap();

  await element(by.text('Pick child paragraph')).tap();
  await element(by.text(childParagraph)).tap();

  if (condition != null) {
    await element(by.text('Pick a condition')).tap();
    await element(by.text(condition)).tap();
  }

  await element(by.id('submit')).tap();
}
