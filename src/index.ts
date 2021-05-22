const randomNumber = () => {
  return Math.floor(100 + Math.random() * 900);
};

export function generateFromEmail(email: string): string {
  // Retrive name from email address
  const nameParts = email.replace(/^(.+)@(.+)$/g, "$1");
  // Replace all special characters like "@ . _";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  // Create unique username
  const username = name + randomNumber();
  return username;
}
